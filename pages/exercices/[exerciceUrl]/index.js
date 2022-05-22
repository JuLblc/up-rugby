import { useState } from 'react'
import { getExercices } from '../../../apiCall/exercices'
import SidebarExercice from '../../../components/Exercice/SidebarExercice'
import styles from '../../../styles/ExerciceDetails.module.css'

const ExerciceDetails = props => {
  const [exercices, setExercices] = useState(props.exercices)

  const handleTitleDisplay = id => {
    const newExercices = [...exercices]

    newExercices.map(exercice => {
      exercice.chapters.map(chapter => (chapter.selected = false))
      if (exercice._id === id) {
        exercice.selected = !exercice.selected
        exercice.chapters[0].selected = true
        return
      }
      if (exercice._id !== id) {
        exercice.selected = false
        return
      }
    })

    setExercices(newExercices)
  }

  const handleChapterDisplay = (exerciceId, chapterId) => {
    const newExercices = [...exercices]

    newExercices.map(exercice => {
      if (exercice._id === exerciceId) {
        exercice.chapters.map(chapter => {
          chapter.selected = false
          if (chapter._id === chapterId) {
            chapter.selected = true
          }
        })
      }
    })

    setExercices(newExercices)
  }

  return (
    <main className={styles.exercice}>
      <h1>Exercices</h1>
      <div className={styles.exerciceContainer}>
        <SidebarExercice
          styles={styles}
          exercices={props.exercices}
          handleTitleDisplay={handleTitleDisplay}
          handleChapterDisplay={handleChapterDisplay}
        />

        <div className={styles.videoContainer}>
          {exercices.map(exercice => {
            if (exercice.selected) {
              return exercice.chapters.map(chapter => {
                
                if (chapter.selected) {
                  if (chapter.subchapters.length > 0) {
                    return chapter.subchapters.map(subchapter => (
                      //Subchapter
                      <div key={subchapter.title}>
                        <span>{subchapter.title}</span>

                        {/* If Subchapter has Infrachapter */}
                        {subchapter.infrachapters.length > 0 &&
                          subchapter.infrachapters.map(infrachapter => (
                            <div key={infrachapter.title}>
                              <span>{infrachapter.title}</span>
                              {infrachapter.lectures.map(lecture => (
                                <div key={lecture.url}>{lecture.url}</div>
                              ))}
                            </div>
                          ))}

                        {/* Subchapter */}
                        {subchapter.infrachapters.length > 0 &&
                          subchapter.lectures.map(lecture => (
                            <div key={lecture.url}>{lecture.url}</div>
                          ))}
                      </div>
                    ))
                  }

                  //{chapter.selected && ()}
                  return (
                    <>
                      <div key={chapter.title}>{chapter.title}</div>
                      {chapter.lectures.map(lecture => (
                        <div key={lecture.url}>{lecture.url}</div>
                      ))}
                    </>
                  )
                }
              })
            }
          })}
        </div>
      </div>
    </main>
  )
}

export default ExerciceDetails

//Server side rendering
export const getServerSideProps = async context => {
  const resAllExercices = await getExercices(context)

  const exercices = resAllExercices.data.exercicesFromDB

  //Set selected attritube to handle display in sidebarExercice
  exercices.map(exercice => {
    if (exercice.seoUrl === context.query.exerciceUrl) {
      exercice.selected = true
      exercice.chapters.map((chapter, idx) =>
        idx === 0 ? (chapter.selected = true) : (chapter.selected = false)
      )
      return
    }

    if (exercice.seoUrl !== context.query.exerciceUrl) {
      exercice.selected = false
      exercice.chapters.map(chapter => (chapter.selected = false))
      return
    }
  })

  return {
    props: {
      exercices
    }
  }
}

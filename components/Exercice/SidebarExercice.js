import { useState } from 'react'
import ExerciceMenu from './ExerciceMenu'

const SidebarExercice = props => {
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
    <ul className={props.styles.exerciceMenuUl}>
      {exercices.map(exercice => (
        <ExerciceMenu
          key={exercice._id}
          styles={props.styles}
          exercice={exercice}
          handleTitleDisplay={handleTitleDisplay}
          handleChapterDisplay={handleChapterDisplay}
        />
      ))}
    </ul>
  )
}

export default SidebarExercice

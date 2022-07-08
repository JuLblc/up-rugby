import { useState } from 'react'
import React from 'react'
import Head from 'next/head'

import { getExercices } from '../../../apiCall/exercices'
import SidebarExercice from '../../../components/Exercice/SidebarExercice'
import ExerciceContent from '../../../components/Exercice/ExerciceContent'

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
    <>
      <Head>
        <title>Exercice - UpRugby</title>
      </Head>
      <main className={styles.exercice}>
        <h1>Exercices</h1>
        <div className={styles.exerciceContainer}>
          <SidebarExercice
            styles={styles}
            exercices={exercices}
            handleTitleDisplay={handleTitleDisplay}
            handleChapterDisplay={handleChapterDisplay}
          />

          <ExerciceContent styles={styles} exercices={exercices} />
        </div>
      </main>
    </>
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

import { getExercices } from '../../../apiCall/exercices'
import SidebarExercice from '../../../components/Exercice/SidebarExercice'
import styles from '../../../styles/ExerciceDetails.module.css'

const ExerciceDetails = props => {
  return (
    <main className={styles.exercice}>
      <h1>Exercices</h1>
      <div className={styles.exerciceContainer}>
        <SidebarExercice
          styles={styles}
          exercices={props.exercices}
        />
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
      exercice.chapters.map((chapter, idx) => idx === 0 ? chapter.selected = true : chapter.selected = false)
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

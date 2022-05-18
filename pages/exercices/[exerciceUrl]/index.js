import { getExercices } from '../../../apiCall/exercices'
import SidebarExercice from '../../../components/Exercice/SidebarExercice'
import styles from '../../../styles/ExerciceDetails.module.css'

const ExerciceDetails = props => {
  return (
    <main className={styles.exercice}>
      <h1>Exercices</h1>
      <div className={styles.exerciceContainer}>
        <SidebarExercice
          // li={li}
          styles={styles}
          exercices={props.exercices}
          // handleDisplay={handleDisplay}
        />
      </div>
    </main>
  )
}

export default ExerciceDetails

//Server side rendering
export const getServerSideProps = async context => {
  const resAllExercices = await getExercices(context)
  const resExercice = await getExercices(context, context.query.exerciceUrl)

  const exercices = resAllExercices.data.exercicesFromDB
  const exercice = resExercice.data.exerciceFromDB

  return {
    props: {
      exercice,
      exercices
    }
  }
}

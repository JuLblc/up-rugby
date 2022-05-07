import Link from 'next/link'
import { getSession } from 'next-auth/react'

import { getExercices } from '../../apiCall/exercices'

import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../../utils/utilResponsive'
import { getLecturesQty, getLecturesTime } from '../../utils/utilCourses'

import CardExercice from '../../components/CardExercice'

import styles from '../../styles/Courses.module.css'

const Exercices = props => {
  const { width, height } = useWindowDimensions()

  const {
    isMobile
    // isTablet,
    // isDesktopOrLaptop,
    // isBigScreen
  } = getDeviceTypeInfo(width, height)

  return (
    <main className={styles.cardFormationContainer}>
      <div className={`${styles.intro} ${!isMobile && styles.introNotMobile}`}>
        <h1>
          Tous les <br />
          <span className={styles.strong}> exercices</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          nisl vulputate, iaculis tortor quis, convallis ipsum. Duis consequat
          fringilla condimentum.
        </p>
        {props.session?.user.role === 'ADMIN' && (
          <Link href='/exercices/create-exercice'>
            <a>Ajouter une catégorie d'exercices</a>
          </Link>
        )}
      </div>
      
      {props.exercices.map(exercice => (
        <CardExercice
          key={exercice._id}
          exercice={exercice}
          lecturesQty={getLecturesQty(exercice)}
          lecturesTimes={getLecturesTime(exercice)}
        />
      ))}
    </main>
  )
}

export default Exercices

export const getServerSideProps = async context => {
  const session = await getSession(context)

  const res = await getExercices()
  const exercices = res.data.exercicesFromDB

  return {
    props: {
      session,
      exercices
    }
  }
}

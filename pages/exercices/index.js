import Link from 'next/link'
import { getExercices } from '../../apiCall/exercices'

import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../../utils/utilResponsive'

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
        <Link href='/exercices/create-exercice'>
          <a>Ajouter une catégorie d'exercices</a>
        </Link>
      </div>
    </main>
  )
}

export default Exercices

export const getServerSideProps = async () => {
  const res = await getExercices()
  const exercices = res.data.exercicesFromDB

  return {
    props: {
      exercices
    }
  }
}

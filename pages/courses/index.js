import { getSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'
import { getCourses } from '../../apiCall/courses'
import { getUser } from '../../apiCall/users'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../../utils/utilResponsive'
import {
  getLecturesQty,
  getLecturesTime,
  checkPurchaseStatus
} from '../../utils/utilCourses'

import CardFormation from '../../components/CardFormation'

import styles from '../../styles/Courses.module.css'

const Courses = props => {
  const { width, height } = useWindowDimensions()

  const {
    isMobile
    // isTablet,
    // isDesktopOrLaptop,
    // isBigScreen
  } = getDeviceTypeInfo(width, height)

  return (
    <>
      <Head>
        <title>Formations - UpRugby</title>
      </Head>
      <main className={styles.cardFormationContainer}>
        <div
          className={`${styles.intro} ${!isMobile && styles.introNotMobile}`}
        >
          <h1>
            Toutes les <br />
            <span className={styles.strong}> formations</span>
          </h1>
          <p>
          Envie d'améliorer ta compréhension du rugby ou de développer des
            compétences spécifiques sur des secteurs de jeu? Voici les
            formations qu'il te faut!
          </p>
          {props.session?.user.role === 'ADMIN' && (
            <Link href='/courses/create-course'>
              <a>Ajouter une formation</a>
            </Link>
          )}
        </div>

        {props.courses.map(course => (
          <CardFormation
            key={course._id}
            course={course}
            userId={props.session?.user.id}
            role={props.session?.user.role}
            lecturesQty={getLecturesQty(course)}
            lecturesTimes={getLecturesTime(course)}
            isPurchased={checkPurchaseStatus(
              props.purchasedCourses,
              course._id
            )}
            isInCart={checkPurchaseStatus(props.cart, course._id)}
          />
        ))}
      </main>
    </>
  )
}

export default Courses

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)

  const res = await getCourses(context)

  if (!session) {
    return {
      props: {
        session,
        courses: res.data.coursesFromDB
      }
    }
  }

  const resUser = await getUser(context)

  return {
    props: {
      session,
      courses: res.data.coursesFromDB,
      purchasedCourses: resUser.data.userFromDB.purchasedCourses,
      cart: resUser.data.userFromDB.cart
    }
  }
}

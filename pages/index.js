import { getSession } from 'next-auth/react'
import { getCourses } from '../apiCall/courses'
import { getUser } from '../apiCall/users'

import { useWindowDimensions } from '../hooks/useWindowDimensions'

import HomeIntro from '../components/Home/HomeIntro'
import HomeSupport from '../components/Home/HomeSupport'
import HomeTestimonial from '../components/Home/HomeTestimonial'

import styles from '../styles/Home.module.css'
import HomeLastCourses from '../components/Home/HomeLastCourses'
import HomeLastExercices from '../components/Home/HomeLastExercices'


const Home = props => {
  const { width } = useWindowDimensions()
  return (
    <main className={styles.home}>
      {!props.session && (
        <>
          <HomeIntro width={width} />
          <HomeSupport />
          <HomeTestimonial width={width} />
        </>
      )}

      {props.session && (
        <>
          <HomeLastCourses courses={props.courses} session={props.session} purchasedCourses={props.purchasedCourses}/>
          <HomeLastExercices session={props.session}/>
        </>
      )}
    </main>
  )
}

export default Home

export const getServerSideProps = async context => {
  const session = await getSession(context)

  if (!session) return {
    props: {
      session
    }
  }

  const res = await getCourses(context)
  const lastCourses = res.data.coursesFromDB.slice(0,2)

  const resUser = await getUser(context)

  return {
    props: {
      session,
      courses: lastCourses,
      purchasedCourses: resUser.data.userFromDB.purchasedCourses,
      cart: resUser.data.userFromDB.cart,
    }
  }
}

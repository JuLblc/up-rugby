import { getSession } from 'next-auth/react'
import { getCourses } from '../apiCall/courses'

import { useWindowDimensions } from '../hooks/useWindowDimensions'

import HomeIntro from '../components/Home/HomeIntro'
import HomeSupport from '../components/Home/HomeSupport'
import HomeTestimonial from '../components/Home/HomeTestimonial'

import styles from '../styles/Home.module.css'
import HomeLastCourse from '../components/Home/HomeLastCourse'

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
          <HomeLastCourse courses={props.courses} session={props.session}/>
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

  return {
    props: {
      session,
      courses: lastCourses
    }
  }
}

import { getSession } from 'next-auth/react'

import Vimeo from '@u-wave/react-vimeo'

import { useWindowDimensions } from '../../../../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../../../../utils/utilResponsive'
import { getCourses } from '../../../../apiCall'
import { getUser } from '../../../../apiCall'

import SideCourseChapter from '../../../../components/SideCourseChapter'

import styles from '../../../../styles/Lectures.module.css'

const Lectures = props => {
  const { width, height } = useWindowDimensions()

  const {
    isMobile,
    isTablet,
    // isDesktopOrLaptop,
    // isBigScreen
  } = getDeviceTypeInfo(width, height)

  return (
    <main>
      <h1>{props.lecture.title}</h1>
      <div className={styles.container}>
        {props.course.isPurchased ? (
          <Vimeo video={props.lecture.url} responsive={true} />
        ) : (
          <div className={styles.blocked}>Contenu bloqué</div>
        )}
        {isMobile || isTablet ? (
            <SideCourseChapter course={props.course} styles={styles} />
        ) : (
          <div className={styles.SideCourseChapterContainer}>
            <SideCourseChapter course={props.course} styles={styles} />
          </div>
        )}
      </div>
      <h2>A propos de ce contenu</h2>
      <p>{props.lecture.description}</p>
    </main>
  )
}

export default Lectures

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  const { chapter, lectureUrl } = context.query

  const resCourse = await getCourses(context, context.query.courseUrl)
  // console.log('resCourse: ', resCourse.data.courseFromDB)

  // Check if user already purchased this course. Pass the result as props
  const course = resCourse.data.courseFromDB

  if (!session || session.user.role === 'ADMIN') {
    course.isPurchased = false
  } else {
    const resUser = await getUser(context)

    const purchasedCourses = resUser.data.userFromDB.purchasedCourses

    if (purchasedCourses.indexOf(course._id) === -1) {
      course.isPurchased = false
    } else {
      course.isPurchased = true
    }
  }

  // Display only the current lecture
  const currentChapter = resCourse.data.courseFromDB.chapters.filter(
    chapt => chapt.seoUrl === chapter
  )[0]
  const lecture = currentChapter.lectures.filter(
    lecture => lecture.seoUrl === lectureUrl
  )[0]

  return {
    props: {
      session,
      course: course,
      lecture: lecture
    }
  }
}

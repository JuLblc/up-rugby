import { getSession } from 'next-auth/react'

import Vimeo from '@u-wave/react-vimeo'

import { getCourses } from '../../../../apiCall'
import { getUser } from '../../../../apiCall'

import SideCourseChapter from '../../../../components/SideCourseChapter'

import styles from '../../../../styles/Lectures.module.css'

const Lectures = props => {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.player}>
          <h1>{props.lecture.title}</h1>
          {props.course.isPurchased ? (
            <Vimeo video={props.lecture.url} width={640} height={360} />
          ) : (
            <div className={styles.blocked}>Contenu bloqué</div>
          )}
          <h2>A propos de ce contenu</h2>
          <p>{props.lecture.description}</p>
        </div>

        <SideCourseChapter course={props.course} />
      </div>
    </main>
  )
}

export default Lectures

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  const { chapter, lectureUrl } = context.query

  const resCourse = await getCourses(context, context.query.courseUrl)
  console.log('resCourse: ', resCourse.data.courseFromDB)

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

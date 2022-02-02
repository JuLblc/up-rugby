import axios from 'axios'

import { getSession } from 'next-auth/react'
import Link from 'next/link'

import SideCourseChapter from '../../../components/SideCourseChapter'

import styles from '../../../styles/Download.module.css'

const Download = props => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.download}>
          <h1>Download Page</h1>
          {props.course.attachements.map(file => (
            <Link
              href={props.course.isPurchased ? file.url : '#'}
              key={file._id}
            >
              <a className={!props.course.isPurchased && styles.disabled}>
                {file.fileName}
              </a>
            </Link>
          ))}
        </div>

        <SideCourseChapter course={props.course} />
      </div>
    </>
  )
}

export default Download

//Server side rendering
export const getServerSideProps = async context => {
  //console.log('context: ', context)
  const session = await getSession(context)
  // console.log('session getServerSideProps FormationDetails: ', session)

  const headers = {}
  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie
  }

  const resCourse = await axios.get(`${process.env.DOMAIN_URL}/api/courses/`, {
    params: { url: context.query.courseUrl },
    headers
  })

  // Check if user already purchased this course. Pass the result as props
  const course = resCourse.data.courseFromDB

  if (!session || session.user.role === 'ADMIN') {
    course.isPurchased = false
  } else {
    const resUser = await axios.get(`${process.env.DOMAIN_URL}/api/users/`, {
      headers
    })
    const purchasedCourses = resUser.data.userFromDB.purchasedCourses

    if (purchasedCourses.indexOf(course._id) === -1) {
      course.isPurchased = false
    } else {
      course.isPurchased = true
    }
  }

  return {
    props: {
      session,
      course
    }
  }
}

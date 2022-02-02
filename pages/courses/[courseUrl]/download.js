import axios from 'axios'

import { getSession } from 'next-auth/react'
import Link from 'next/link'

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
              <a className={!props.course.isPurchased && styles.disabled}>{file.fileName}</a>
            </Link>
          ))}
        </div>
        <div className={styles.sideCourseChapter}>
          {props.course.chapters.map(chapter => {
            return (
              <div className={styles.sectionChapters} key={chapter._id}>
                <h4>{chapter.title}</h4>
                {chapter.lectures.map(lecture => {
                  return (
                    <Link
                      href={`/courses/${props.course.seoUrl}/lecture/${lecture.seoUrl}?chapter=${chapter.seoUrl}`}
                      key={lecture._id}
                    >
                      <a>{lecture.title}</a>
                    </Link>
                  )
                })}
              </div>
            )
          })}
          {props.course.attachements.length > 0 && (
            <h4>
              <Link href={`/courses/${props.course.seoUrl}/download`}>
                <a>Téléchargement</a>
              </Link>
            </h4>
          )}
        </div>
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

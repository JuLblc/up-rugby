import axios from 'axios'

import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import Vimeo from '@u-wave/react-vimeo'

import Link from 'next/link'

import styles from '../../../../styles/Lectures.module.css'

const Lectures = props => {
  console.log('props lectures: ', props)

  return (
    <div className={styles.container}>
      <div className={styles.player}>
        <h1>{props.lecture.title}</h1>
        <Vimeo video={props.lecture.url} width={640} height={360}/>
        <h2>A propos de ce contenu</h2>
        <p>{props.lecture.description}</p>
      </div>
      <div className={styles.sideCourseChapter}>
        {props.course.chapters.map(chapter => {
          return (
            <div className={styles.sectionChapters} key={chapter._id}>
              <h4>{chapter.title}</h4>
              {chapter.lectures.map(lecture => {
                return (
                  <Link
                    href={`/courses/${props.course._id}/lecture/${lecture._id}?chapterId=${chapter._id}`}
                    key={lecture._id}
                  >
                    <a>{lecture.title}</a>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Lectures

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  // console.log('session getServerSideProps FormationDetails: ', session)

  const { chapterId, lectureId } = context.query

  const res = await axios.get(`${process.env.DOMAIN_URL}/api/courses/`, {
    params: { id: context.query.courseId },
    headers: { cookie: context.req.headers.cookie }
  })

  const course = res.data.courseFromDB
  const chapter = res.data.courseFromDB.chapters.filter(
    chapter => chapter._id === chapterId
  )[0]
  const lecture = chapter.lectures.filter(
    lecture => lecture._id === lectureId
  )[0]

  return {
    props: {
      session,
      course: course,
      lecture: lecture
    }
  }
}

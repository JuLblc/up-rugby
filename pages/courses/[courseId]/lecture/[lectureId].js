import axios from 'axios'

import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import Link from 'next/link'

const Lectures = props => {
  console.log('props lectures: ', props)

  return (
    <div className='container'>
      <div className='player'>
        <h1>{props.lecture.title}</h1>
        <p>{props.lecture.description}</p>
        <p>{props.lecture.url}</p>
      </div>
      <div className='side-course-chapter'>
        {props.course.chapters.map(chapter => {
          return (
            <div className='section-chapters' key={chapter._id}>
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

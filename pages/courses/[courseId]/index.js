import axios from 'axios'
import { useSession, getSession } from 'next-auth/react'

const FormationDetails = props => {
  // console.log('props FormationDetails: ', props)

  return (
    <>
      <h1>{props.course.title}</h1>
      {props.course.chapters.map(chapter => {
        return (
          <div key={chapter._id}>
            <h2>{chapter.title}</h2>
            {chapter.lectures.map(lecture => {
              return (
                <div key={lecture._id}>
                  <p>{lecture.title}</p>
                  <p>{lecture.description}</p>
                  <p>{lecture.url}</p>
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}

export default FormationDetails

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  // console.log('session getServerSideProps FormationDetails: ', session)

  const res = await axios.get(`${process.env.DOMAIN_URL}/api/courses/`, {
    params: { id: context.query.courseId },
    headers: context.req.headers
  })

  return {
    props: {
      session,
      course: res.data.courseFromDB
    }
  }
}

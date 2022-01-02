import axios from 'axios'
import { useSession, getSession } from 'next-auth/react'

const FormationDetails = props => {

  console.log('props: ', props)

  return (
    <>
      <h1>{props.course.title}</h1>
      {props.course.chapters.map(chapter => {
        return (
          <div key={chapter.title}>
            <h2>{chapter.title}</h2>
            {chapter.lectures.map(lecture => {
              return (
                <div key={lecture.title}>
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

  const res = await axios.get(`${process.env.DOMAIN_URL}/api/courses/`, {
    params: { id: context.query.courseId }
  })

  return {
    props: {
      session,
      course: res.data.courseFromDB
    }
  }
}
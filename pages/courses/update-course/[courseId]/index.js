import axios from 'axios'
import { useSession, getSession } from 'next-auth/react'
import Formation from '../../../../components/Formation'

const UpdateCourseDetails = props => {

  console.log('props: ', props)
  
  return (
    <>
      <h1>{props.course.title}</h1>

      <Formation courseContent={props.course} action={'update'}/>
    </>
  )
}

export default UpdateCourseDetails

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

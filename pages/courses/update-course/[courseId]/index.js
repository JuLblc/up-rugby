import axios from 'axios'
import { compareSync } from 'bcryptjs'
import { useSession, getSession } from 'next-auth/react'
import Formation from '../../../../components/Formation'

const UpdateCourseDetails = props => {
  // console.log('props UpdateCourseDetails: ', props)

  return (
    <>
      <h1>{props.course.title}</h1>

      <Formation
        courseContent={props.course}
        action={'update'}
        disable={true}
      />
    </>
  )
}

export default UpdateCourseDetails

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  // console.log('session getServerSideProps UpdateCourseDetails: ', session)

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

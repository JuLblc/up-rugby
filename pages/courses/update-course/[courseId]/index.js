import axios from 'axios'

import { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Formation from '../../../../components/Formation'

const UpdateCourseDetails = props => {
  const router = useRouter()

  useEffect(() => {
    if (!props.session) {
      router.push('/login')
    } else if (props.session.user.role !== 'ADMIN') {
      router.back()
    }
  }, [])

  return (
    <>
      {props.course && (
        <>
          <h1>{props.course.title}</h1>

          <Formation
            courseContent={props.course}
            action={'update'}
            disable={true}
          />
        </>
      )}
    </>
  )
}

export default UpdateCourseDetails

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  // console.log('session getServerSideProps UpdateCourseDetails: ', session)

  // Check if user is authorized before sending axios request
  if (!session || session.user.role !== 'ADMIN') {
    return {
      props: {
        session
      }
    }
  }
  
  const headers = {}
  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie
  }

  const res = await axios.get(`${process.env.DOMAIN_URL}/api/courses/`, {
    params: { id: context.query.courseId },
    headers
  })

  return {
    props: {
      session,
      course: res.data.courseFromDB
    }
  }
}

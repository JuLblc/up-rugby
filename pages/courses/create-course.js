import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'

import Formation from '../../components/Formation'

const NewCourse = props => {
  const router = useRouter()

  useEffect(() => {
    if (!props.session) {
      router.push('/login')
    } else if (props.session.user.role !== 'ADMIN') {
      router.back()
    }
  }, [])

  const emptyCourse = {
    title: '',
    overview: '',
    category: '',
    price: '',
    //image: '',
    chapters: [
      {
        title: '',
        lectures: [
          {
            title: '',
            description: '',
            url: ''
          }
        ]
      }
    ],
    isPublished: false
  }

  return (
    <>
      {props.session && props.session.user.role === 'ADMIN' && (
        <>
          <h1>Ajouter formation</h1>

          <Formation
            courseContent={emptyCourse}
            action={'create'}
            disable={false}
          />
        </>
      )}
    </>
  )
}

export default NewCourse

export const getServerSideProps = async context => {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}

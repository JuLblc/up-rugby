import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'

import Formation from '../../components/FormFormation/Formation'

const NewCourse = props => {
  const router = useRouter()

  useEffect(() => {
    if (!props.session) {
      router.push('/login?login=signin')
      return
    }
    if (props.session.user.role !== 'ADMIN') {
      router.back()
    }
  }, [])

  const emptyCourse = {
    title: '',
    description:'',
    seoUrl: '',
    overview: '',
    category: '',
    price: 0,
    // set image by default
    img: {
      fileName: 'logo.png',
      url: 'https://res.cloudinary.com/dwznpgbcd/image/upload/v1646205285/uprugby-uploads-pict-formation/logo.png.png',
      width: 1528,
      height: 1004
    },
    chapters: [
      {
        title: '',
        seoUrl: '',
        lectures: [
          {
            title: '',
            seoUrl: '',
            description: '',
            url: '',
            duration: 0
          }
        ]
      }
    ],
    isPublished: false,
    attachements: []
  }

  return (
    <main>
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
    </main>
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

import { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getExercices } from '../../../../apiCall/exercices'
import Exercice from '../../../../components/FormExercice/Exercice'

const UpdateExerciceDetails = props => {
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

  return (
    <main>
      {props.exercice && (
        <>
          <h1>{props.exercice.title}</h1>

          <Exercice
            exerciceContent={props.exercice}
            action={'update'}
            // disable={true}
          />
        </>
      )}
    </main>
  )
}


export default UpdateExerciceDetails

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)

  // Check if user is authorized before sending request
  if (!session || session.user.role !== 'ADMIN') {
    return {
      props: {
        session
      }
    }
  }

  const res = await getExercices(context, context.query.exerciceUrl)

  return {
    props: {
      session,
      exercice: res.data.exerciceFromDB
    }
  }
}

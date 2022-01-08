import axios from 'axios'
import { getSession } from 'next-auth/react'
import Link from 'next/link'

import CardFormation from '../../components/CardFormation'

import styles from '../../styles/CardFormation.module.css'

const Courses = props => {
  // console.log('props: ', props)

  return (
    <>
      <h1>Formations</h1>
      <h2>Toutes les formations sont affichées</h2>
      <ul>
        <li>Visiteurs</li>
        <li>Utilisateurs connectés</li>
        <li>Utilisateurs ayant acheté la formation</li>
        <li>
          /!\ Seuls les Utilisateurs ayant payé peuvent accéder à la vidéo /!\
        </li>
      </ul>

      {props.session?.user.role === 'ADMIN' && (
        <Link href='/courses/create-course'>
          <a>Ajouter une formation</a>
        </Link>
      )}

      <div className={styles.cardFormationContainer}>
        {props.courses.map(course => {
          return (
            <CardFormation
              key={course._id}
              courseId={course._id}
              title={course.title}
              price={course.price}
              isPublished={course.isPublished}
              role={props.session?.user.role}
            />
          )
        })}
      </div>
    </>
  )
}

export default Courses

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  console.log('session getServer Courses: ', session)
  // console.log('context: ', context.req.headers)

  const res = await axios.get(`${process.env.DOMAIN_URL}/api/courses`, {
    headers: context.req.headers
  })

  return {
    props: {
      session,
      courses: res.data.coursesFromDB
    }
  }
}

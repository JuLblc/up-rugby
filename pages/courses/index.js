import axios from 'axios'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import CardFormation from '../../components/CardFormation'

import styles from '../../styles/CardFormation.module.css'

const Courses = props => {
  // console.log('props: ', props)

  const { data: session } = useSession()
  // console.log('session courses: ',{ session })

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

      <Link href='/courses/create-course'>
        <a>Ajouter une formation</a>
      </Link>

      <div className={styles.cardFormationContainer}>
        {props.courses.map(course => {
          return (
            <CardFormation
              key={course._id}
              courseId={course._id}
              title={course.title}
              price={course.price}
              isPublished={course.isPublished}
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
  // console.log('session getServer: ', session)

  const res = await axios.get(`${process.env.DOMAIN_URL}/api/courses`)

  return {
    props: {
      session,
      courses: res.data.coursesFromDB
    }
  }
}

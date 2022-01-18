import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useState } from 'react'

import Link from 'next/link'

import styles from '../styles/Profile.module.css'

const Profile = props => {

  // Prevent to be undefined
  !props.userFromDB.firstName ? (props.userFromDB.firstName = '') : props.userFromDB.firstName
  !props.userFromDB.lastName ? (props.userFromDB.lastName = '') : props.userFromDB.lastName
  !props.userFromDB.club ? (props.userFromDB.club = '') : props.userFromDB.club

  const [displayInfo, setDisplayInfo] = useState(true)
  const [displayCourses, setDisplayCourses] = useState(false)

  const [userData, setUserData] = useState(props.userFromDB)
  const [disableField, setDisableField] = useState(true)

  const onChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleDisplay = e => {
    if (e.target.id === 'info' && !displayInfo) {
      setDisplayInfo(!displayInfo)
      setDisplayCourses(!displayCourses)
    }
    if (e.target.id === 'course' && !displayCourses) {
      setDisplayInfo(!displayInfo)
      setDisplayCourses(!displayCourses)
    }
  }

  const editUserData = () => {
    setDisableField(false)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    setDisableField(true)

    axios
      .put('/api/users', { userData })
      .then(response => {
        console.log('response: ', response.data)
      })
      .catch(err => console.log('err: ', err.response.data.message))
  }

  return (
    <>
      <h1>Mon compte</h1>
      <ul>
        <li id='info' onClick={e => handleDisplay(e)}>
          Mes informations
        </li>
        <li id='course' onClick={e => handleDisplay(e)}>
          Mes formations
        </li>
      </ul>

      {displayInfo && (
        <>
          <h2>Mes informations</h2>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <label className={styles.label}>
              Prénom:
              <input
                type='text'
                name='firstName'
                value={userData.firstName}
                onChange={onChange}
                disabled={disableField}
              />
            </label>

            <label className={styles.label}>
              Nom:
              <input
                type='text'
                name='lastName'
                value={userData.lastName}
                onChange={onChange}
                disabled={disableField}
              />
            </label>

            <label className={styles.label}>
              Catégorie:
              <select
                name='category'
                value={userData.category}
                onChange={onChange}
                disabled={disableField}
              >
                <option value='Joueur'>Joueur</option>
                <option value='Entraineur'>Entraineur</option>
              </select>
            </label>

            <label className={styles.label}>
              Club:
              <input
                type='text'
                name='club'
                value={userData.club}
                onChange={onChange}
                disabled={disableField}
              />
            </label>

            {disableField ? (
              // Fields are disabled and buttons are displayed
              <button type='button' onClick={editUserData}>
                Editer mes informations
              </button>
            ) : (
              <>
                {/* Fields are enabled and buttons are displayed */}
                <button type='submit'>Enregistrer</button>
              </>
            )}
          </form>
        </>
      )}

      {displayCourses && (
        <div>
          <h2>Mes formations</h2>
          {props.purchasedCourses.length > 0 ? (
            props.purchasedCourses.map(course => (
              <Link href={`/courses/${course._id}`} key={course._id}>
                <a>{course.title}</a>
              </Link>
            ))
          ) : (
            <div>Vous n'avez pas encore acheté de formations</div>
          )}
        </div>
      )}
    </>
  )
}

export default Profile

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  // console.log('session getServer Profile: ', session)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const headers = {}
  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie
  }

  const resUser = await axios.get(`${process.env.DOMAIN_URL}/api/users/`, {
    headers
  })

  const userFromDB = resUser.data.userFromDB
  const purchasedCoursesId = resUser.data.userFromDB.purchasedCourses
  // console.log('purchasedCoursesId: ', purchasedCoursesId)
  // soit tableau de promesses - 1 requete par id => si 10 id => bcp de requete

  /* soit on fetch toutes les formations et on filtre sur celles achetées */
  let purchasedCourses = []
  if (purchasedCoursesId) {
    const resCourses = await axios.get(
      `${process.env.DOMAIN_URL}/api/courses`,
      {
        headers
      }
    )

    purchasedCourses = resCourses.data.coursesFromDB.filter(course =>
      purchasedCoursesId.includes(course._id)
    )
  }
  /* ------------------------------------------------------------------------------- */

  return {
    props: {
      session,
      userFromDB,
      purchasedCourses
    }
  }
}

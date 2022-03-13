import { getSession } from 'next-auth/react'
import { useState } from 'react'

import { getCourses } from '../apiCall/courses'
import { getUser, putUser } from '../apiCall/users'

import Link from 'next/link'

import styles from '../styles/Profile.module.css'

const Profile = props => {
  // Prevent to be undefined
  !props.userFromDB.firstName
    ? (props.userFromDB.firstName = '')
    : props.userFromDB.firstName
  !props.userFromDB.lastName
    ? (props.userFromDB.lastName = '')
    : props.userFromDB.lastName
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

  const handleFormSubmit = async e => {
    e.preventDefault()
    setDisableField(true)

    await putUser(userData)
  }

  return (
    <main className={styles.profile}>
      
        <h1>Mon compte</h1>

        <div className={styles.profileContainer}>

        <ul>
          <p className={styles.menuTitle}>Tableau de bord</p>
          <li id='info' onClick={e => handleDisplay(e)}>
            Mes informations
          </li>
          <li id='course' onClick={e => handleDisplay(e)}>
            Mes formations
          </li>
        </ul>
      

      {displayInfo && (
        <>
          {/* <h2>Mes informations</h2> */}
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
          {/* <h2>Mes formations</h2> */}
          {props.purchasedCourses.length > 0 ? (
            props.purchasedCourses.map(course => (
              <Link href={`/courses/${course.seoUrl}`} key={course._id}>
                <a>{course.title}</a>
              </Link>
            ))
            ) : (
              <div>Vous n'avez pas encore acheté de formations</div>
              )}
        </div>
      )}
      </div>
    </main>
  )
}

export default Profile

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login?login=signin',
        permanent: false
      }
    }
  }

  const resUser = await getUser(context)

  const userFromDB = resUser.data.userFromDB
  const purchasedCoursesId = resUser.data.userFromDB.purchasedCourses

  let purchasedCourses = []
  if (purchasedCoursesId) {
    const resCourses = await getCourses(context)

    purchasedCourses = resCourses.data.coursesFromDB.filter(course =>
      purchasedCoursesId.includes(course._id)
    )
  }

  return {
    props: {
      session,
      userFromDB,
      purchasedCourses
    }
  }
}

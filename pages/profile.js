import { getSession } from 'next-auth/react'

import { useState, useEffect } from 'react'

import { getCourses } from '../apiCall/courses'
import { getUser, putUser, removeCourseToCart } from '../apiCall/users'

import Sidebar from '../components/Profile/Sidebar'
import UserCourses from '../components/Profile/UserCourses'
import UserCart from '../components/Profile/UserCart'
import UserInfo from '../components/Profile/UserInfo'
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

  const [state, setState] = useState({
    displayInfo: true,
    displayCourses: false,
    displayCart: false,
    disableField: true,
    cart: props.cart
  })

  useEffect(() => {
    if (props.profileOpt === 'cart') {
      setState({
        ...state,
        displayInfo: false,
        displayCourses: false,
        displayCart: true
      })
      return
    }

    if (props.profileOpt === 'courses') {
      setState({
        ...state,
        displayInfo: false,
        displayCourses: true,
        displayCart: false
      })

      if (props.sessionId){
       
      }

      return
    }

    if (props.profileOpt === 'userInfo') {
      setState({
        ...state,
        displayInfo: true,
        displayCourses: false,
        displayCart: false
      })
      return
    }
  }, [])

  const [userData, setUserData] = useState(props.userFromDB)

  const inputs = [
    {
      id: 1,
      name: 'firstName',
      type: 'text',
      label: 'Prénom: '
    },
    {
      id: 2,
      name: 'lastName',
      type: 'text',
      label: 'Nom: '
    },
    {
      id: 3,
      name: 'club',
      type: 'text',
      label: 'Club: '
    }
  ]

  const li = [
    {
      id: 'info',
      styles: state.displayInfo ? styles.selected : styles.unselected,
      label: 'Mes informations'
    },
    {
      id: 'course',
      styles: state.displayCourses ? styles.selected : styles.unselected,
      label: 'Mes achats'
    },
    {
      id: 'cart',
      styles: state.displayCart ? styles.selected : styles.unselected,
      label: 'Mon panier'
    }
  ]

  const onChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleDisplay = e => {
    if (e.target.id === 'info' && !state.displayInfo) {
      setState({
        ...state,
        displayInfo: true,
        displayCourses: false,
        displayCart: false
      })
    }

    if (e.target.id === 'course' && !state.displayCourses) {
      setState({
        ...state,
        displayInfo: false,
        displayCourses: true,
        displayCart: false
      })
    }

    if (e.target.id === 'cart' && !state.displayCart) {
      setState({
        ...state,
        displayInfo: false,
        displayCourses: false,
        displayCart: true
      })
    }
  }

  const editUserData = () => {
    setState({
      ...state,
      disableField: false
    })
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    setState({
      ...state,
      disableField: true
    })

    await putUser(userData)
  }

  const deleteCourseToCart = async id => {
    
    let newState = {...state}
    let idx = newState.cart.map(course => course._id).indexOf(id)
    newState.cart.splice(idx, 1)
    
    setState({
      ...state,
      cart: newState.cart
    })
    await removeCourseToCart(id)
  }

  return (
    <main className={styles.profile}>
      <h1>Mon compte</h1>

      <div className={styles.profileContainer}>
        <Sidebar li={li} styles={styles} handleDisplay={handleDisplay} />

        {state.displayInfo && (
          <UserInfo
            styles={styles}
            handleFormSubmit={handleFormSubmit}
            inputs={inputs}
            userData={userData}
            onChange={onChange}
            disableField={state.disableField}
            editUserData={editUserData}
          />
        )}

        {state.displayCourses && (
          <UserCourses
            courses={props.purchasedCourses}
            styles={styles}
            CTA='start'
          />
        )}

        {state.displayCart && (
          <UserCart
            cart={state.cart}
            deleteCourseToCart={deleteCourseToCart}
            styles={styles}
            userEmail={userData.email}
          />
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

  const profileOpt = context.query.profile
  // const sessionId = context.query.session_id

  const resUser = await getUser(context)

  const userFromDB = resUser.data.userFromDB
  const purchasedCoursesId = resUser.data.userFromDB.purchasedCourses
  const cartCoursesId = resUser.data.userFromDB.cart

  let resCourses

  let purchasedCourses = []
  if (purchasedCoursesId || cartCoursesId) {
    resCourses = await getCourses(context)
  }

  if (purchasedCoursesId) {
    purchasedCourses = resCourses.data.coursesFromDB.filter(course =>
      purchasedCoursesId.includes(course._id)
    )
  }

  let cart = []
  if (cartCoursesId) {
    cart = resCourses.data.coursesFromDB.filter(course =>
      cartCoursesId.includes(course._id)
    )
  }

  return {
    props: {
      session,
      userFromDB,
      purchasedCourses,
      cart,
      profileOpt,
    }
  }
}

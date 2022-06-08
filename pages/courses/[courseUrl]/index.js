import { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import parse from 'html-react-parser'

import { getCourses } from '../../../apiCall/courses'
import { getUser, putCourseToUser,putCourseToCart, removeCourseToCart } from '../../../apiCall/users'
import {
  getLecturesQty,
  getLecturesTime,
  checkPurchaseStatus
} from '../../../utils/utilCourses'

import SideCourseChapter from '../../../components/SideCourseChapter'

import styles from '../../../styles/CourseDetails.module.css'

const FormationDetails = props => {
  const router = useRouter()

  const [isInCart, setisInCart] = useState(props.isInCart)

  useEffect(() => {
    // To prevent 'USER' to see 'ADMIN' courses
    if (!props.course) {
      router.back()
    }
  }, [])

  const startCourse = () => {
    router.push(
      `/courses/${props.course.seoUrl}/lecture/${props.course.chapters[0].lectures[0].seoUrl}?chapter=${props.course.chapters[0].seoUrl}`
    )
  }

  const addCourseToCart = async () => {

    if (!props.session) {
      router.push('/login?login=signin')
      return
    }

    if (props.session.user.id) {
      setisInCart(true)
      await putCourseToCart(props.course._id)
      return
    }    
  }

  const deleteCourseToCart = async () => {
    if (props.session.user.id){
      setisInCart(false)
      await removeCourseToCart(props.course._id)
    }
  }

  return (
    <>
      {props.course && (
        <main>
          <h1>{props.course.title}</h1>
          <div className={styles.container}>
            <div className={styles.courseChapters}>
              <h2>Chapitres</h2>
              <SideCourseChapter course={props.course} styles={styles} />
            </div>
            <div className={styles.overview}>
              <h2>Présentation</h2>
              <div>
                <article>{parse(props.course.overview)}</article>
                <div className={styles.argumentsContainer}>
                  <div className={styles.argument}>
                    <span>Informations</span>
                    <ul>
                      <li>{getLecturesTime(props.course)} de vidéo</li>
                      <li>{`${getLecturesQty(props.course)} Chapitre${
                        getLecturesQty(props.course) > 1 ? 's' : ''
                      }`}</li>
                    </ul>
                  </div>
                  <div className={styles.CTA}>
                    {/* Purchase button isn't display for ADMIN */}
                    {(!props.session || props.session.user.role !== 'ADMIN') &&
                      // Display purchase button only if the course has not been purchased by user yet
                      (props.course.isPurchased ? (
                        <button onClick={startCourse}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            width='24'
                            height='24'
                          >
                            <path fill='none' d='M0 0h24v24H0z' />
                            <path
                              fill='#F4F9FF'
                              d='M7.752 5.439l10.508 6.13a.5.5 0 0 1 0 .863l-10.508 6.13A.5.5 0 0 1 7 18.128V5.871a.5.5 0 0 1 .752-.432z'
                            />
                          </svg>
                          <span>Commencer</span>
                        </button>
                      ) : isInCart ? (
                        <button onClick={deleteCourseToCart} className={styles.removeBtn}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            width='24'
                            height='24'
                          >
                            <path fill='none' d='M0 0h24v24H0z' />
                            <path
                              fill='#e44258'
                              d='M4 6.414L.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414zM5.5 23a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z'
                            />
                          </svg>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            width='24'
                            height='24'
                          >
                            <path fill='none' d='M0 0h24v24H0z' />
                            <path
                              fill='#e44258'
                              d='M17 4h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5V2h10v2zM9 9v8h2V9H9zm4 0v8h2V9h-2z'
                            />
                          </svg>
                        </button>
                      ) : (
                        <button onClick={addCourseToCart}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            width='18'
                            height='18'
                          >
                            <path fill='none' d='M0 0h24v24H0z' />
                            <path
                              fill='#f7fafb'
                              d='M4 6.414L.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414zM5.5 23a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z'
                            />
                          </svg>
                          <span>Ajouter</span>
                        </button>
                      ))}
                  </div>
                  <div className={styles.argument}>
                    <span>Liens utiles</span>
                    <ul>
                      <li>Lien 1</li>
                      <li>Lien 2</li>
                      <li>Lien 3</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default FormationDetails

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)

  const resCourse = await getCourses(context, context.query.courseUrl)

  if (!session) {
    return {
      props: {
        session,
        course: resCourse.data.courseFromDB
      }
    }
  }

  const resUser = await getUser(context)

  return {
    props: {
      session,
      course: resCourse.data.courseFromDB,
      purchasedCourses: resUser.data.userFromDB.purchasedCourses,
      isInCart: checkPurchaseStatus(
        resUser.data.userFromDB.cart,
        resCourse.data.courseFromDB._id
      )
    }
  }
}

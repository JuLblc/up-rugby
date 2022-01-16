import axios from 'axios'

import { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Link from 'next/link'

import styles from '../../../styles/FormationDetails.module.css'

const FormationDetails = props => {
  // console.log('props FormationDetails: ', props)

  const router = useRouter()

  useEffect(() => {
    // To prevent 'USER' to see 'ADMIN' courses
    if (!props.course) {
      router.back()
    }
  }, [])

  const onPurchase = async () => {
    const query = {}

    //1. Check if user is logged in
    if (!props.session) {
      query.error = 'please log in to purchase'
      router.push({
        pathname: '/login',
        query
      })
    } else {
      //2. After payment, add formation to user
      axios
        .put('/api/users', {
          courseId: props.course._id
        })
        .then(response => {
          console.log('response: ', response.data)
          //3. Redirect to payment confirmation page
          query.courseId = props.course._id
          query.firstChapterId = props.course.chapters[0]._id
          query.firstLectureId = props.course.chapters[0].lectures[0]._id

          router.push({
            pathname: '/purchase-confirmation',
            query
          })
        })
        .catch(err => console.log('err: ', err.response.data.message))
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
              {props.course.chapters.map(chapter => {
                return (
                  <div className='section-chapters' key={chapter._id}>
                    <h3>{chapter.title}</h3>
                    {chapter.lectures.map(lecture => {
                      return (
                        <Link
                          href={`/courses/${props.course._id}/lecture/${lecture._id}?chapterId=${chapter._id}`}
                          key={lecture._id}
                        >
                          <a>{lecture.title}</a>
                        </Link>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            <div className={styles.overview}>
              <h2>Présentation</h2>
              <div>
                <article>{props.course.overview}</article>
                {/* Purchase button isn't display for ADMIN */}
                {(!props.session || props.session.user.role !== 'ADMIN') &&
                  // Display purchase button only if the course has not been purchased by user yet
                  (props.course.isPurchased ? (
                    <Link
                      href={`/courses/${props.course._id}/lecture/${props.course.chapters[0].lectures[0]._id}?chapterId=${props.course.chapters[0]._id}`}
                    >
                      <a>Commencer</a>
                    </Link>
                  ) : (
                    <button className={styles.buy} onClick={onPurchase}>
                      $ Acheter $
                    </button>
                  ))}
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
  // console.log('session getServerSideProps FormationDetails: ', session)

  const headers = {}
  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie
  }

  const resCourse = await axios.get(`${process.env.DOMAIN_URL}/api/courses/`, {
    params: { id: context.query.courseId },
    headers
  })

  // Check if user already purchased this course. Pass the result as props
  const course = resCourse.data.courseFromDB

  if (!session || session.user.role === 'ADMIN') {
    course.isPurchased = false
  } else {
    const resUser = await axios.get(`${process.env.DOMAIN_URL}/api/users/`, {
      headers
    })
    const purchasedCourses = resUser.data.userFromDB.purchasedCourses

    if (purchasedCourses.indexOf(course._id) === -1) {
      course.isPurchased = false
    } else {
      course.isPurchased = true
    }
  }

  return {
    props: {
      session,
      course
    }
  }
}

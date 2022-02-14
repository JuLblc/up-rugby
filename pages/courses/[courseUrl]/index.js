import axios from 'axios'

import { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import parse from 'html-react-parser'
import Link from 'next/link'

import { getCourses } from '../../../apiCall'
import { getUser } from '../../../apiCall'
import { convertTime } from '../../../utils/utilCourses'

import SideCourseChapter from '../../../components/SideCourseChapter'

import styles from '../../../styles/CourseDetails.module.css'

const FormationDetails = props => {
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
        .put('/api/users/add-course-to-user', {
          courseId: props.course._id
        })
        .then(response => {
          console.log('response: ', response.data)
          //3. Redirect to payment confirmation page
          query.course = props.course.seoUrl
          query.chapter = props.course.chapters[0].seoUrl
          query.lecture = props.course.chapters[0].lectures[0].seoUrl

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
              <SideCourseChapter course={props.course} styles={styles} />
            </div>
            <div className={styles.overview}>
              <h2>Présentation</h2>
              <div>
                <article>{parse(props.course.overview)}</article>
                {/* Purchase button isn't display for ADMIN */}
                {(!props.session || props.session.user.role !== 'ADMIN') &&
                  // Display purchase button only if the course has not been purchased by user yet
                  (props.course.isPurchased ? (
                    <Link
                      href={`/courses/${props.course.seoUrl}/lecture/${props.course.chapters[0].lectures[0].seoUrl}?chapter=${props.course.chapters[0].seoUrl}`}
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

  const resCourse = await getCourses(context, context.query.courseUrl)

  // Check if user already purchased this course. Pass the result as props
  const course = resCourse.data.courseFromDB

  if (!session || session.user.role === 'ADMIN') {
    course.isPurchased = false
  } else {
    const resUser = await getUser(context)

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

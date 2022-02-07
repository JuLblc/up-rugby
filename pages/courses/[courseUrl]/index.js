import axios from 'axios'

import { useEffect } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getCourses } from '../../../apiCall'
import { getUser } from '../../../apiCall'

import Link from 'next/link'
import parse from 'html-react-parser'

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
              <div className={styles.chaptersSplit}>
                {props.course.chapters.map(chapter => (
                  <div className='section-chapters' key={chapter._id}>
                    <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                    {chapter.lectures.map(lecture => (
                      <Link
                        href={`/courses/${props.course.seoUrl}/lecture/${lecture.seoUrl}?chapter=${chapter.seoUrl}`}
                        key={lecture._id}
                      >
                        <a className={styles.link}>
                          <div className={styles.linkDetails}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              width='24'
                              height='24'
                            >
                              <path fill='none' d='M0 0h24v24H0z' />
                              <path d='M7.752 5.439l10.508 6.13a.5.5 0 0 1 0 .863l-10.508 6.13A.5.5 0 0 1 7 18.128V5.871a.5.5 0 0 1 .752-.432z' />
                            </svg>
                            <span className={styles.lectureTitle}>
                              {lecture.title}
                            </span>
                            <span className={styles.lectureDuration}>
                              12 min
                            </span>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                ))}
                {props.course.attachements.length > 0 && (
                  <h3 className={styles.chapterTitle}>Téléchargement</h3>
                )}
                {props.course.attachements.map(file => (
                  <div className={styles.download} key={file._id}>
                    <span>{file.fileName}</span>
                    {props.course.isPurchased ? (
                      <Link href={file.url}>
                        <a>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            width='24'
                            height='24'
                          >
                            <path fill='none' d='M0 0h24v24H0z' />
                            <path
                              d='M4 19h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7zM14 9h5l-7 7-7-7h5V3h4v6z'
                              fill='rgba(128,128,128,1)'
                            />
                          </svg>
                        </a>
                      </Link>
                    ) : (
                      <a>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          width='24'
                          height='24'
                        >
                          <path fill='none' d='M0 0h24v24H0z' />
                          <path
                            d='M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zm-2 0V9A5 5 0 0 0 7 9v1h10zm-6 4v4h2v-4h-2z'
                            fill='rgba(128,128,128,1)'
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
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

import { getSession } from 'next-auth/react'
import Image from 'next/image'
import parse from 'html-react-parser'

import Vimeo from '@u-wave/react-vimeo'

import { useWindowDimensions } from '../../../../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../../../../utils/utilResponsive'
import { getCourses } from '../../../../apiCall'
import { getUser } from '../../../../apiCall'

import SideCourseChapter from '../../../../components/SideCourseChapter'
import Comment from '../../../../components/Comment'

import styles from '../../../../styles/Lectures.module.css'

import blockedImg from '../../../../public/blocked.jpg'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Lectures = props => {
  const { width, height } = useWindowDimensions()

  const {
    isMobile,
    isTablet,
    isDesktopOrLaptop,
    isBigScreen
  } = getDeviceTypeInfo(width, height)

  const [toggleMenu, setToggleMenu] = useState(true) // true => description / false => sommaire
  const [toggleOnPlayMsg, setToggleOnPlayMsg] = useState({
    isFirstLoad: true,
    user: 'visitor'
  })

  const onTryToPlay = () => {
    if (!props.session) {
      setToggleOnPlayMsg({ isFirstLoad: false, user: 'visitor' })
      return
    }

    setToggleOnPlayMsg({ isFirstLoad: false, user: 'member' })
  }

  useEffect(() => {
    if (isDesktopOrLaptop || isBigScreen) {
      setToggleMenu(true)
    }
  }, [width, height])

  return (
    <main className={styles.main}>
      <h1>{props.lecture.title}</h1>
      <section className={styles.container}>
        {props.course.isPurchased ? (
          <Vimeo video={props.lecture.url} responsive={true} />
        ) : (
          <div className={styles.blockedContentWrapper} onClick={onTryToPlay}>
            <div className={styles.blockedImageWrapper}>
              <Image src={blockedImg} alt='blockedImg' />
            </div>

            <div className={styles.blockedContent}>
              {/* Display message according to user */}
              {toggleOnPlayMsg.isFirstLoad ? (
                <>
                  <svg
                    className={styles.svgPlayBlocked}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='64'
                    height='64'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path d='M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z' />
                  </svg>

                  <span className={styles.textPlay}>Lire la vidéo</span>
                  <span className={styles.textDuration}>
                    ({props.lecture.duration} min)
                  </span>
                </>
              ) : toggleOnPlayMsg.user === 'visitor' ? (
                <span className={styles.textPlay}>
                  <Link href='/login?login=signin'>
                    <a>Connectez-vous</a>
                  </Link>{' '}
                  pour acheter cette formation
                </span>
              ) : (
                <span className={styles.textPlay}>
                  <Link href='#'>
                    <a>Acheter</a>
                  </Link>{' '}
                  cette formation pour lire la vidéo
                </span>
              )}
            </div>
          </div>
        )}
        {(isDesktopOrLaptop || isBigScreen) && (
          <div className={styles.SideCourseChapterContainer}>
            <SideCourseChapter course={props.course} styles={styles} />
          </div>
        )}
      </section>
      {/* <div className={styles.break}></div> */}
      <section className={styles.lectureContainer}>
        {(isMobile || isTablet) && (
          <>
            <div className={styles.break}></div>
            <div className={styles.smallNav}>
              <div
                className={toggleMenu ? `${styles.selected}` : undefined}
                onClick={() => !toggleMenu && setToggleMenu(!toggleMenu)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                >
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    d='M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z'
                    // fill='rgba(58,58,58,1)'
                    fill={toggleMenu ? '#0f56b3' : 'rgba(58,58,58,1)'}
                  />
                </svg>
                <span>Description</span>
              </div>
              <div
                className={!toggleMenu && `${styles.selected}`}
                onClick={() => toggleMenu && setToggleMenu(!toggleMenu)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                >
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    d='M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12h4v4a3 3 0 0 1-3 3zm-1-5v2a1 1 0 0 0 2 0v-2h-2zm-2 3V4H4v15a1 1 0 0 0 1 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z'
                    // fill='rgba(58,58,58,1)'
                    fill={!toggleMenu ? '#0f56b3' : 'rgba(58,58,58,1)'}
                  />
                </svg>
                <span>Sommaire</span>
              </div>
            </div>
            <div className={styles.break}></div>
          </>
        )}

        {toggleMenu && (
          <>
            <div className={styles.lectureDescription}>
              <h3>A propos de ce contenu</h3>
              <article>{parse(props.lecture.description)}</article>
            </div>

            {props.course.isPurchased && <Comment session={props.session}/>}
          </>
        )}
        {(isMobile || isTablet) && !toggleMenu && (
          <SideCourseChapter course={props.course} styles={styles} />
        )}
      </section>
    </main>
  )
}

export default Lectures

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)
  const { chapter, lectureUrl } = context.query

  const resCourse = await getCourses(context, context.query.courseUrl)
  // console.log('resCourse: ', resCourse.data.courseFromDB)

  // Check if user already purchased this course. Pass the result as props
  const course = resCourse.data.courseFromDB

  // Display only the current lecture
  const currentChapter = resCourse.data.courseFromDB.chapters.filter(
    chapt => chapt.seoUrl === chapter
  )[0]
  const lecture = currentChapter.lectures.filter(
    lecture => lecture.seoUrl === lectureUrl
  )[0]

  if (!session) {
    course.isPurchased = false
    return {
      props: {
        session,
        course,
        lecture
      }
    }
  }

  if (session.user.role === 'ADMIN') {
    course.isPurchased = true
    return {
      props: {
        session,
        course,
        lecture
      }
    }
  }

  const resUser = await getUser(context)
  const purchasedCourses = resUser.data.userFromDB.purchasedCourses

  purchasedCourses.indexOf(course._id) === -1
    ? (course.isPurchased = false)
    : (course.isPurchased = true)

  return {
    props: {
      session,
      course,
      lecture
    }
  }
}

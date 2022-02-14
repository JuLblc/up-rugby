import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { getCourses } from '../../apiCall'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../../utils/utilResponsive'
import { getLecturesQty , getLecturesTime } from '../../utils/utilCourses'

import CardFormation from '../../components/CardFormation'

import styles from '../../styles/Courses.module.css'

const Courses = props => {
  const { width, height } = useWindowDimensions()

  const {
    isMobile,
    isTablet,
    isDesktopOrLaptop,
    isBigScreen
  } = getDeviceTypeInfo(width, height)

  return (
    <main className={styles.cardFormationContainer}>
      <div className={`${styles.intro} ${!isMobile && styles.introNotMobile}`}>
        <h1>
          Toutes les <br />
          <span className={styles.strong}> formations</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          nisl vulputate, iaculis tortor quis, convallis ipsum. Duis consequat
          fringilla condimentum.
        </p>
        {props.session?.user.role === 'ADMIN' && (
          <Link href='/courses/create-course'>
            <a>Ajouter une formation</a>
          </Link>
        )}
      </div>

      {props.courses.map(course => {
        return (
          <CardFormation
            key={course._id}
            courseId={course._id}
            title={course.title}
            seoUrl={course.seoUrl}
            price={course.price}
            isPublished={course.isPublished}
            role={props.session?.user.role}
            lecturesQty={getLecturesQty(course)}
            lecturesTimes={getLecturesTime(course)}
            img={course.img}
          />
        )
      })}
    </main>
  )
}

export default Courses

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)

  const res = await getCourses(context)

  return {
    props: {
      session,
      courses: res.data.coursesFromDB
    }
  }
}

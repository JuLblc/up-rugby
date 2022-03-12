import Link from 'next/link'

import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../../utils/utilResponsive'
import { getLecturesQty, getLecturesTime } from '../../utils/utilCourses'

import CardFormation from '../CardFormation'

import stylesCourses from '../../styles/Courses.module.css'
import stylesHome from '../../styles/Home.module.css'

const HomeLastCourses = props => {
  const { width, height } = useWindowDimensions()

  const {
    isMobile
    // isTablet,
    // isDesktopOrLaptop,
    // isBigScreen
  } = getDeviceTypeInfo(width, height)

  return (
    <section
      className={`${stylesCourses.cardFormationContainer} ${stylesHome.sectionHomeLogged}`}
    >
      <div
        className={`${stylesCourses.intro} ${!isMobile &&
          stylesCourses.introNotMobile}`}
      >
        <h1>
          Les dernières <br />
          <span className={stylesCourses.strong}> formations</span>
        </h1>
        <p>
          Envie d'améliorer ta compréhension du rugby ou de développer des
          compétences spécifiques sur des secteurs de jeu? Voici les dernières
          formations disponibles.
        </p>
        <div className={stylesHome.link}>
          <Link href='/courses'>
            <a>Toutes les formations</a>
          </Link>
        </div>
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
    </section>
  )
}

export default HomeLastCourses

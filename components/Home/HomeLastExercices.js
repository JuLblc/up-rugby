import stylesCourses from '../../styles/Courses.module.css'
import stylesHome from '../../styles/Home.module.css'

import Link from 'next/link'

import CardExercice from '../Exercice/CardExercice'

import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../../utils/utilResponsive'

import { getLecturesQty, getLecturesTime } from '../../utils/utilCourses'

const HomeLastExercices = props => {
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
          Les derniers <br />
          <span className={stylesCourses.strong}> exercices</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          nisl vulputate, iaculis tortor quis, convallis ipsum. Duis consequat
          fringilla condimentum.
        </p>
        <div className={stylesHome.link}>
          <Link href='/exercices'>
            <a>Tous les exercices</a>
          </Link>
        </div>
      </div>

      {props.exercices.map(exercice => (
        <CardExercice
          key={exercice._id}
          exercice={exercice}
          role={props.session?.user.role}
          lecturesQty={getLecturesQty(exercice)}
          lecturesTimes={getLecturesTime(exercice)}
        />
      ))}
    </section>
  )
}

export default HomeLastExercices

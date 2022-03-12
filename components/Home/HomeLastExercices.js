import stylesCourses from '../../styles/Courses.module.css'
import stylesHome from '../../styles/Home.module.css'

import Link from 'next/link'

import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../../utils/utilResponsive'

const HomeLastExercices = () => {
  const { width, height } = useWindowDimensions()

  const {
    isMobile
    // isTablet,
    // isDesktopOrLaptop,
    // isBigScreen
  } = getDeviceTypeInfo(width, height)

  return (
    <section className={`${stylesHome.support} ${stylesHome.sectionLastExercices }`}>
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
    </section>
  )
}

export default HomeLastExercices

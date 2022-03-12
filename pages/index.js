import styles from '../styles/Home.module.css'

import { useWindowDimensions } from '../hooks/useWindowDimensions'

import HomeIntro from '../components/Home/HomeIntro'
import HomeSupport from '../components/Home/HomeSupport'
import HomeTestimonial from '../components/Home/HomeTestimonial'

const Home = () => {
  const { width } = useWindowDimensions()

  return (
    <main className={styles.home}>
      <HomeIntro width={width} />
      <HomeSupport />
      <HomeTestimonial width={width} />
    </main>
  )
}

export default Home

import styles from '../styles/About.module.css'
import Image from 'next/image'
import imgPortrait from '../public/Charles.PNG'
import imgPaysage from '../public/charles_paysage.png'
import Head from 'next/head'

import { useWindowDimensions } from '../hooks/useWindowDimensions'

const About = () => {
  const { width } = useWindowDimensions()
  return (
    <>
      <Head>
        <title>A propos - UpRugby</title>
      </Head>
      <main className={styles.main}>
        <h1>
          Charles <span>Jouan</span>
        </h1>
        <section>
          <article>
            <h2>A propros de moi</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              ultrices metus nisl. Sed ultrices urna sit amet libero pretium
              placerat. Praesent venenatis, neque nec ultricies malesuada, arcu
              tortor porta odio, id ullamcorper turpis justo et nibh. Integer id
              ex sit amet justo lobortis fringilla eget non erat. Vestibulum sed
              gravida diam. Etiam ullamcorper, erat id mollis tincidunt, tortor
              dui lacinia eros, at euismod dolor velit in arcu.
            </p>

            <p>
              Vivamus sem mauris, consectetur eu feugiat a, pharetra vel sem.
              Donec scelerisque purus ac leo maximus, id lacinia orci lacinia.
              Integer purus elit, tempor a gravida quis, aliquam consectetur
              ante. Donec mollis tellus eget mauris egestas molestie. Quisque
              pretium ex turpis, eget gravida ipsum tincidunt at. Fusce interdum
              ligula in justo varius auctor.
            </p>
          </article>
          <div className={styles.imgWrapper}>
            <Image src={width < 815 ? imgPaysage : imgPortrait} alt={'charles'} />
          </div>
        </section>
      </main>
    </>
  )
}

export default About

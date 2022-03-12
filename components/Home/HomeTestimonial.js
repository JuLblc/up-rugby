import styles from '../../styles/Home.module.css'
import testiPict1 from '../../public/testi-1.jpg'
import testiPict2 from '../../public/testi-2.jpg'
import testiPict3 from '../../public/testi-3.jpg'
import testiPict4 from '../../public/testi-4.jpg'
import testiPict5 from '../../public/testi-5.jpg'

import CardTestimonial from '../../components/CardTestimonial'

import { useEffect, useState, useRef } from 'react'
import { getElementProperties } from '../../utils/utilTestimonial'


const HomeTestimonial = (props) => {

  const testimonials = [
    {
      id: 0,
      img: testiPict1,
      content: `"Nous avions quelques idées sur les systèmes de jeu et notamment le
          système 1 3 3 1 mais de façon assez globale et empirique… Le détails et
          la finesse de l’analyse nous ont permis de gagner en précision et en
          connaissance. De superbes outils (analyse vidéo, powerpoint…) tant
          pour les éducateurs que pour les joueurs. Je recommande vivement !
          Bravo Charles !"`,
      name: 'Adrien Renault',
      jobs: ['RESPONSABLE SPORTIF COB79']
    },
    {
      id: 1,
      img: testiPict4,
      content: `"Contenu pertinent et efficace. Travaillant dans un comité Départemental de rugby, et étant entraîneur en fédérale 1, les formations de Charles m’ont permis de continuer à progresser dans le métier et l’analyse du jeu. Merci encore Charles et je recommande fortement à tous entraîneurs (Pro – Fédéral – Série) les formations Up Rugby"`,
      name: 'Valentin Caillaux',
      jobs: ['ENTRAÎNEUR ESPOIR', 'ENTRAÎNEUR F1', 'AGENT DE DÉVELOPPEMENT FFR']
    },
    {
      id: 2,
      img: testiPict3,
      content: `"Cette formation est ultra-complète et intéressante. Charles propose toutes les variantes de ce système offensif, chacun peut s’y reconnaître et se l’approprier. Le travail de compilation des vidéos est formidable et permet de bien comprendre la finalité de ce système. Et que dire des différents Powerpoint mis à disposition pour que chacun d’entre nous puisse les intégrer à son projet de jeu."`,
      name: 'Jean Marc Laboret',
      jobs: ['ENTRAINEUR HONNEUR']
    },
    {
      id: 3,
      img: testiPict2,
      content: `"Très bonne formation. Facilement expliquée avec des illustrations sur des vidéos. Formateur disponible pour des explications et des approfondissements. Merci à toi. Je reviens pour d’autres formations."`,
      name: 'Bakary Soumahoro',
      jobs: ["DTN ADJOINT CÔTE D'IVOIRE"]
    },
    {
      id: 4,
      img: testiPict5,
      content: `"Voilà un expert qui met à notre disposition des connaissances et des savoirs indispensables à notre quotidien de coach pour optimiser le potentiel de nos équipes, augmenter notre pouvoir de transformation. En plus elles sont évolutives ! Bravo pour cet immense travail et cet apport à notre rugby"`,
      name: 'Serge Collinet',
      jobs: ['RESP. SPORTIF STADE FRANÇAIS', 'CHAMPION DE FRANCE FED. 2']
    }
  ]

  const [offset, setOffset] = useState(0)
  const [display, setDisplay] = useState({ items: 3, width: -33.3333 })
  const sliderRef = useRef()

  useEffect(() => {
    if (props.width > 1420) {
      setDisplay({ items: 3, width: -33.3333 })
      sliderRef.current.style.left = offset * display.width + '%'
      return
    }

    const { cardMarginLeftNum, sliderWidthNum } = getElementProperties(
      sliderRef.current
    )

    if (props.width > 1060 && props.width <= 1420) {
      const width = (-100 * (1 - cardMarginLeftNum / sliderWidthNum)) / 2
      setDisplay({
        items: 2,
        width
      })
      sliderRef.current.style.left = offset * display.width + '%'
      return
    }

    if (props.width <= 1060) {
      const width = -100 * (1 - cardMarginLeftNum / sliderWidthNum)
      setDisplay({ items: 1, width })
      sliderRef.current.style.left = offset * display.width + '%'
      return
    }

    if (props.width <= 720) {
      setDisplay({ items: 1, width: -100 })
    }
  }, [props.width])

  const clickIncrease = () => {
    if (offset < testimonials.length - display.items) {
      sliderRef.current.style.left = (offset + 1) * display.width + '%'
      setOffset(offset + 1)
    }
  }

  const clickDecrease = () => {
    if (offset > 0) {
      sliderRef.current.style.left = (offset - 1) * display.width + '%'
      setOffset(offset - 1)
    }
  }

  return (
    <section className={styles.testiContainer}>
      <div className={`${styles.body} ${styles.bodyTestimonial}`}>
        <h1>
          <span>Témoignages</span> d'entraineurs
        </h1>
        <p>Consultez les témoignages les plus marquants.</p>
        <div className={styles.bodyComment}>
          Certains entraîneurs ont préféré garder l'anonymat (notamment Fed. 2
          et au dessus), je travail à révéler leur identité!
        </div>

        {/* Displaying button above testimonial container*/}
        {props.width > 720 && (
          <div className={styles.btnContainer}>
            <button
              className={`${styles.swipeBtn} ${
                offset === 0 ? styles.btnDisabled : undefined
              }`}
              type='button'
              onClick={clickDecrease}
              disabled={offset === 0 ? true : false}
            >
              {'<'}
            </button>
            <button
              className={`${styles.swipeBtn} ${
                offset === testimonials.length - display.items
                  ? styles.btnDisabled
                  : undefined
              }`}
              type='button'
              onClick={clickIncrease}
              disabled={
                offset === testimonials.length - display.items ? true : false
              }
            >
              {'>'}
            </button>
          </div>
        )}
      </div>
      <div className={styles.sliderContainer}>
        <div ref={sliderRef} className={styles.slider}>
          {testimonials.map(testimonial => (
            <CardTestimonial
              key={testimonial.id}
              img={testimonial.img}
              content={testimonial.content}
              name={testimonial.name}
              jobs={testimonial.jobs}
            />
          ))}
        </div>
        {/* Displaying button below testimonial container */}
        {props.width <= 720 && (
          <>
            <button
              className={`${styles.swipeBtn} ${styles.swipeBtnMob} ${
                offset === 0 ? styles.btnDisabled : undefined
              }`}
              type='button'
              onClick={clickDecrease}
              disabled={offset === 0 ? true : false}
            >
              {'<'}
            </button>
            <button
              className={`${styles.swipeBtn} ${styles.swipeBtnMob} ${
                styles.swipeBtnMobRight
              } ${
                offset === testimonials.length - display.items
                  ? styles.btnDisabled
                  : undefined
              }`}
              type='button'
              onClick={clickIncrease}
              disabled={
                offset === testimonials.length - display.items ? true : false
              }
            >
              {'>'}
            </button>
          </>
        )}
      </div>
    </section>
  )
}

export default HomeTestimonial

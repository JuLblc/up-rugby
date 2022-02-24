import Image from 'next/image'
import styles from '../styles/CardTestimonial.module.css'

import testiPict from '../public/testi-1.jpg'

const CardTestimonial = props => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <Image src={testiPict} alt='testimonial-picture' />
        <div className={styles.quote}>"</div>
      </div>

      <p className={styles.testimonial}>
        <i>
          "Nous avions quelques idées sur les systèmes de jeu et notamment le
          système 1 3 3 1 mais de façon assez globale et empirique…Le détails et
          la finesse de l’analyse nous ont permis de gagner en précision et en
          connaissance. De superbes outils (analyse vidéo, powerpoint…) tant
          pour les éducateurs que pour les joueurs. Je recommande vivement !
          Bravo Charles !"
        </i>
      </p>
      <div className={styles.break}></div>
      <p className={styles.name}>Adrien Renault</p>
      <p className={styles.jobTitle}>RESPONSABLE SPORTIF COB79</p>
    </div>
  )
}

export default CardTestimonial

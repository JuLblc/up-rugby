import Link from 'next/link'
import Image from 'next/image'
import img from '../public/relance-de-jeu.jpg'

import styles from '../styles/CardFormation.module.css'

const CardFormation = props => {
  // console.log('CardFormation props: ', props)
  return (
    <article className={styles.cardFormation}>
      <span className={styles.imgCard}>
        <Image src={img} alt='img' />
      </span>
      <div className={styles.formationInfo}>
        <h3 className={styles.formationTitle}>{props.title}</h3>
        <p className={styles.formationDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className={styles.cardFooterContainer}>
        <div className={styles.cardFooterInfo}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='19'
            height='19'
          >
            <path fill='none' d='M0 0h24v24H0z' />
            <path
              d='M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12h4v4a3 3 0 0 1-3 3zm-1-5v2a1 1 0 0 0 2 0v-2h-2zm-2 3V4H4v15a1 1 0 0 0 1 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z'
              fill='rgba(128,128,128,1)'
            />
          </svg>
          <span>4 Chapitres</span>
        </div>
        <div className={styles.cardFooterInfo}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='19'
            height='19'
          >
            <path fill='none' d='M0 0h24v24H0z' />
            <path
              d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z'
              fill='rgba(128,128,128,1)'
            />
          </svg>
          <span>2h51</span>
        </div>

        <span>{props.price} €</span>
        {/* if course is a draft, it still can be updated by ADMIN only */}
        {props.role === 'ADMIN' && !props.isPublished && (
          <Link href={`/courses/update-course/${props.seoUrl}`}>
            <a>Modifier</a>
          </Link>
        )}
      </div>
      <Link href={`/courses/${props.seoUrl}`}>
        <a className={styles.link}>Détails</a>
      </Link>
    </article>
  )
}

export default CardFormation

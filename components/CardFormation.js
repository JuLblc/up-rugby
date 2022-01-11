import Link from 'next/link'
import Image from 'next/image'

import styles from '../styles/CardFormation.module.css'

const CardFormation = props => {
  // console.log('CardFormation props: ', props)
  return (
    <div className={styles.cardFormation}>
      <img src='https://via.placeholder.com/370x220' alt='placeholder' />
      <div className={styles.formationInfo}>
        <h3>{props.title}</h3>
        <p>
          Prix: <span>{props.price}</span>
        </p>
      </div>
      <div className={styles.linkContainer}>
        <Link href={`/courses/${props.courseId}`}>
          <a className={styles.link}>Détails</a>
        </Link>
        {/* if course is a draft, it still can be updated by ADMIN only */}
        {props.role === 'ADMIN' && !props.isPublished && (
          <Link href={`/courses/update-course/${props.courseId}`}>
             <a className={styles.link}>Modifier</a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default CardFormation

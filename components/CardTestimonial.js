import Image from 'next/image'
import styles from '../styles/CardTestimonial.module.css'

const CardTestimonial = props => {
  return (
    // <div
    //   className={`${styles.cardContainer} ${!props.display &&
    //     styles.notDisplayed}`}
    // >
    <div className={`${styles.cardContainer}`}>
      <div className={styles.imageWrapper}>
        <Image src={props.img} alt='testimonial-picture' />
        <div className={styles.quote}>"</div>
      </div>

      <p className={styles.testimonial}>
        <i>{props.content}</i>
        <span className={styles.fadeOut}></span>
      </p>
      <div className={styles.break}></div>
      <div className={styles.signatureContainer}>
        <div className={styles.signature}>
          <p className={styles.name}>{props.name}</p>
          {props.jobs.map(job => (
            <p className={styles.jobTitle} key={job}>
              {job}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardTestimonial

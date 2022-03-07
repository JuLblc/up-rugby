import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/CardTestimonial.module.css'
import { useFirstRender } from '../hooks/useFirstRender'

const CardTestimonial = props => {
  const ref = useRef()
  const firstRender = useFirstRender()

  useEffect(() => {
    // ref.current.style.display = "block"
    if (!firstRender) {
      setTimeout(() => {
        // console.log('useEffect')
        console.log('props.display: ', props.display)
        props.updateStateFromChild(null)
        if (!props.display) {
          console.log('ajouter class not display')
          // ref.current.style.display = "none"
        }
      }, 500)
    }
  }, [props.trigger])

  return (
    <div
      ref={ref}
      className={`
      ${styles.cardContainer} 
      ${props.display &&
        props.animation === 'LeftToRight' &&
        styles.enterLeftToRight}
      ${!props.display &&
        props.animation === 'LeftToRight' &&
        styles.exitLeftToRight}
      ${!props.display &&
        props.animation === 'RightToLeft' &&
        styles.exitRightToLeft}
      ${props.display &&
        props.animation === 'RightToLeft' &&
        styles.enterRightToLeft}  
      `}
    >
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

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'

import styles from '../../styles/CardFormation.module.css'
import stylesExercice from '../../styles/CardExercice.module.css'


import { useWindowDimensions } from '../../hooks/useWindowDimensions'

import { getDeviceTypeInfo } from '../../utils/utilResponsive'

const CardExercice = props => {
  const { width, height } = useWindowDimensions()
  const { isMobile, isTablet } = getDeviceTypeInfo(width, height)

  const [selected, setSelected] = useState(false)

  const divRef = useRef()

  const handleSelectedChange = () => {
    const $div = divRef.current.classList

    if (selected) {
      if ($div.contains('CardExercice_selected__a603m')) {
        $div.remove('CardExercice_selected__a603m')
      }
      $div.add('CardExercice_unselected__jmf67')
    }

    if (!selected) {
      if ($div.contains('CardExercice_unselected__jmf67')) {
        $div.remove('CardExercice_unselected__jmf67')
      }
      $div.add('CardExercice_selected__a603m')
    }
    setSelected(!selected)
  }
  return (
    <article
      className={styles.cardFormation}
      onMouseEnter={isTablet || isMobile ? undefined : handleSelectedChange}
      onMouseLeave={isTablet || isMobile ? undefined : handleSelectedChange}
    >
      <span className={styles.imgCard}>
        <Image
          src={props.exercice.img.url}
          alt='img'
          width={props.exercice.img.width}
          height={props.exercice.img.height}
        />
      </span>
      <div className={styles.CardFormationWrapper}>
        <div ref={divRef} className={stylesExercice.formationInfo}>
          <h3 className={styles.formationTitle}>{props.exercice.title}</h3>
          {/* if course is a draft, it still can be updated by ADMIN only */}
          {/* Code to add here */}
          <p className={styles.formationDescription}>
            {props.exercice.description}
          </p>
          <div className={styles.cardInfoWrapper}>
            <div className={styles.cardInfoContainer}>
              <div className={styles.cardInfo}>
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
                <span>{`${props.exercice.chapters.length} Chapitre${
                  props.exercice.chapters.length > 1 ? 's' : ''
                }`}</span>
              </div>
              <div className={styles.cardInfo}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='19'
                  height='19'
                >
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path
                    d='M16 4a1 1 0 0 1 1 1v4.2l5.213-3.65a.5.5 0 0 1 .787.41v12.08a.5.5 0 0 1-.787.41L17 14.8V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14zm-1 2H3v12h12V6zM7.4 8.829a.4.4 0 0 1 .215.062l4.355 2.772a.4.4 0 0 1 0 .674L7.615 15.11A.4.4 0 0 1 7 14.77V9.23c0-.221.18-.4.4-.4zM21 8.84l-4 2.8v.718l4 2.8V8.84z'
                    fill='rgba(128,128,128,1)'
                  />
                </svg>
                <span>{`${props.lecturesQty} Vidéo${
                  props.lecturesQty > 1 ? 's' : ''
                }`}</span>
              </div>
              <div className={styles.cardInfo}>
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
                <span>{props.lecturesTimes}</span>
              </div>
            </div>
            <div className={stylesExercice.CTA}>
              <Link href={`/exercices/${props.exercice.seoUrl}`}>
                <a>Détails</a>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={styles.cardFooterContainer}
          onClick={isTablet || isMobile ? handleSelectedChange : undefined}
        >
          {!selected && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'
                fill='rgba(128,128,128,1)'
              />
            </svg>
          )}

          {selected && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                d='M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z'
                fill='rgba(128,128,128,1)'
              />
            </svg>
          )}
        </div>
      </div>
    </article>
  )
}

export default CardExercice

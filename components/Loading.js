import React from 'react'
import styles from '../styles/Loading.module.css'

const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
        <img src="/spinning-circles.svg" />
    </div>
  )
}

export default Loading

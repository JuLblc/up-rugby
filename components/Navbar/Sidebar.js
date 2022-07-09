import React, { useState } from 'react'
import Link from 'next/link'

import styles from '../../styles/Sidebar.module.css'

const Sidebar = props => {
  return (
    <ul
      className={`${styles.sidebar} ${
        props.open ? styles.open : styles.closed
      }`}
    >
      <li>
        <Link href='/courses'>
          <a>Formations</a>
        </Link>
      </li>
      <li>
        <Link href='/exercices'>
          <a>Exercices</a>
        </Link>
      </li>
      <li>
        <Link href='/blog'>
          <a>Blog</a>
        </Link>
      </li>
      {/* <li>
        <Link href='#'>
          <a>Prestation</a>
        </Link>
      </li> */}
      <li>
        <Link href='/about'>
          <a>A propos</a>
        </Link>
      </li>
    </ul>
  )
}

export default Sidebar

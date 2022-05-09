import React, { useState } from 'react'
import styles from '../../styles/Burger.module.css'

import Sidebar from './Sidebar'

const Burger = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className={`${styles.burger} ${open ? styles.open : styles.closed}`} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </div>
      <Sidebar open={open} />
    </>
  )
}

export default Burger;

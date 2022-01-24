import React, { useState } from 'react'
import styles from '../styles/Burger.module.css'

const Burger = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className={`${styles.burger} ${open ? styles.open : styles.closed}`} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </div>
      {/* <RightNav open={open} /> */}
    </>
  )
}

export default Burger;

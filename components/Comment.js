import Image from 'next/image'
import styles from '../styles/Comment.module.css'
import avatar from '../public/avatar_default.png'
import parse from 'html-react-parser'
import { diffTime } from '../utils/utilCourses'
import { useWindowDimensions } from '../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../utils/utilResponsive'

const Comment = props => {
  const { width, height } = useWindowDimensions()
  const {
    isMobile,
    isTablet,
  } = getDeviceTypeInfo(width, height)

  const handleReply = () => {
    props.updateStateFromChild(true)
  }

  const { authorname, comment, date } = props.commentData

  return (
    <div
      className={`${styles.comment} ${props.isReply && styles.commentIsReply}`}
    >
      <div className={styles.userWrapper}>
        <div className={styles.avatarWrapper}>
          <Image src={avatar} alt='avatar' />
        </div>
        <div className={styles.userInfo}>
          <p className={styles.authorName}>{authorname}</p>
          <div className={styles.action}>
            <p>
              <i>Il y a {diffTime(Date.parse(date))}</i>
            </p>
            {props.session && !props.isReply && (
              <div
                className={`${
                  isMobile || isTablet ? styles.replyMobileOrTab : styles.reply
                }`}
                onClick={handleReply}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='16'
                  height='16'
                >
                  <path fill='none' d='M0 0H24V24H0z' />
                  <path
                    d='M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81C19.46 16.95 16.458 15 13 15h-2v5z'
                    fill='rgba(128,128,128,1)'
                  />
                </svg>
                <p className={styles.replyLink}>Répondre</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>{parse(comment)}</div>
    </div>
  )
}

export default Comment

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/CommentDisplay.module.css'
import { getComment } from '../apiCall/comments'
import { diffTime } from '../utils/utilCourses'
import avatar from '../public/avatar_default.png'
import parse from 'html-react-parser'
import CommentInput from './CommentInput'

const CommentDisplay = props => {
  const [commentData, setCommentData] = useState({
    authorname: '',
    comment: '',
    date: ''
  })

  const [replyVisible, setReplyVisible] = useState(false)

  const fetchComment = useCallback(async () => {
    const resComment = await getComment(props.id)
    setCommentData(resComment.data.commentFromDB)
  }, [])

  useEffect(() => {
    fetchComment()
  }, [fetchComment])

  const { authorname, comment, date } = commentData

  const updateStateFromChild = isVisible => {
    setReplyVisible(isVisible)
  }

  const handleReply = () => {
    setReplyVisible(true)
  }

  return (
    <>
      <div className={styles.CommentDisplay}>
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
              <div className={styles.reply} onClick={handleReply}>
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
            </div>
          </div>
        </div>
        <div className={styles.comment}>{parse(comment)}</div>
      </div>
      {replyVisible && <CommentInput session={props.session} isReply={true} updateStateFromChild={updateStateFromChild}/>}
    </>
  )
}

export default CommentDisplay

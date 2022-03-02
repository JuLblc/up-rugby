import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/CommentDisplay.module.css'
import { getComment } from '../apiCall/comments'
import { diffTime } from '../utils/utilCourses'
import avatar from '../public/avatar_default.png'
import parse from 'html-react-parser'

const CommentDisplay = props => {
  const [commentData, setCommentData] = useState({
    authorname: '',
    comment: '',
    date: ''
  })

  const fetchComment = useCallback(async () => {
    const resComment = await getComment(props.id)
    setCommentData(resComment.data.commentFromDB)
  }, [])

  useEffect(() => {
    fetchComment()
  }, [fetchComment])

  const { authorname, comment, date } = commentData

  return (
    <div className={styles.CommentDisplay}>
      <div className={styles.userWrapper}>
        <div className={styles.avatarWrapper}>
          <Image src={avatar} alt='avatar' />
        </div>
        <div className={styles.userInfo}>
          <p className={styles.authorName}>{authorname}</p>
          <p className={styles.date}><i>Il y a {diffTime(Date.parse(date))}</i></p>
        </div>
      </div>
      <div className={styles.comment}>{parse(comment)}</div>
    </div>
  )
}

export default CommentDisplay

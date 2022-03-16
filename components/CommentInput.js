import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import FormInput from './FormInput'
import { putCommentToCourse } from '../apiCall/courses'
import { postComment, postReply } from '../apiCall/comments'
import styles from '../styles/CommentInput.module.css'
import stylesInput from '../styles/Login.module.css'


const CommentInput = props => {
  const router = useRouter()

  const myRef = useRef(null)
  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })

  useEffect(() => {
    if (props.isReply) executeScroll()
  }, [])

  const [commentData, setCommentData] = useState({
    author: props.session.user.id,
    authorname: props.session.user.firstName,
    comment: ''
  })

  const onChange = e => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    props.updateStateFromChild(false)
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    //convert /n into <br>
    const regex = /\n/gi
    const convertedCommentData = { ...commentData }
    convertedCommentData.comment = convertedCommentData.comment.replace(
      regex,
      '<br>'
    )

    if (!props.isReply) {
      const resComment = await postComment(convertedCommentData)

      const updatedCourse = { ...props.course }
      updatedCourse.chapters[props.chapterIdx].lectures[
        props.lectureIdx
      ].comments.push(resComment.data.newCommentFromDB)

      await putCommentToCourse(updatedCourse)
    }

    if (props.isReply) {
      await postReply(props.id, convertedCommentData)
    }

    router.push(router.asPath)
  }

  return (
    <form
      ref={myRef}
      onSubmit={handleFormSubmit}
      className={`${styles.commentForm} ${props.isReply &&
        styles.commentFormIsReply}`}
    >
      <FormInput
        label="NOM D'UTILISATEUR:"
        type='text'
        name='authorname'
        required={true}
        value={commentData.authorname}
        onChange={onChange}
        styles={stylesInput}
      />
      <label>
        VOTRE MESSAGE:
        <textarea
          name='comment'
          value={commentData.comment}
          required={true}
          onChange={onChange}
        ></textarea>
      </label>

      <div className={styles.btnContainer}>
        <button type='submit'>Envoyer</button>
        {props.isReply && (
          <button type='button' onClick={handleCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  )
}

export default CommentInput

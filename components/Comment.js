import { useRouter } from 'next/router'
import { useState } from 'react'
import FormInput from './FormInput'
import { putCommentToCourse } from '../apiCall/courses'
import { postComment } from '../apiCall/comments'
import styles from '../styles/Comment.module.css'

const Comment = props => {
  const router = useRouter()

  const [commentData, setCommentData] = useState({
    author: props.session.user.id,
    authorname: props.session.user.firstName,
    comment: ''
  })

  const onChange = e => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    const resComment = await postComment(commentData)

    const updatedCourse = { ...props.course }
    updatedCourse
      .chapters[props.chapterIdx]
      .lectures[props.lectureIdx]
      .comments
      .push(resComment.data.newCommentFromDB)

    await putCommentToCourse(updatedCourse)
    router.push(router.asPath)
  }

  return (
    <div className={styles.comment}>
      <h3>Commentaire</h3>
      <div className={styles.break}></div>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="NOM D'UTILISATEUR:"
          type='text'
          name='authorname'
          required={true}
          value={commentData.authorname}
          onChange={onChange}
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

        <button type='submit'>Envoyer</button>
      </form>
    </div>
  )
}

export default Comment

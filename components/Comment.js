import axios from 'axios'
import { useRouter } from 'next/router'
import FormInput from './FormInput'
import styles from '../styles/Comment.module.css'

const Comment = props => {
  const router = useRouter()

  const handleFormSubmit = e => {
    e.preventDefault()

    console.log('post comment')

    const newComment = {
        author : props.session.user.id,
        comment:'some text'
    }

    axios
      .post('/api/comment', { comment: newComment})
      .then(response => {
        console.log('response coment: ', response.data)
        router.push(router.asPath)
      })
      .catch(err => console.log('err: ', err))
  }

  return (
    <div className={styles.comment}>
      <h3>Commentaire</h3>
      <div className={styles.break}></div>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="NOM D'UTILISATEUR:"
          type='text'
          name='username'
          //   errorMessages={errorMessages}
          //   required={true}
        //   value={props.session.user.firstName}
          //   onChange={onChange}
        />
        <label>
          VOTRE MESSAGE:
          <textarea name='comment'></textarea>
        </label>

        <button type='submit'>Envoyer</button>
      </form>
    </div>
  )
}

export default Comment

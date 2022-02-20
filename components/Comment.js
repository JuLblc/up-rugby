import FormInput from './FormInput'
import styles from '../styles/Comment.module.css'

const Comment = props => {
  return (
    <div className={styles.comment}>
      <h3>Commentaire</h3>
      <div className={styles.break}></div>
      <form>
        <FormInput
          label="NOM D'UTILISATEUR:"
          type='text'
          name='username'
          //   errorMessages={errorMessages}
          //   required={true}
          //   value={courseData.title}
          //   onChange={onChange}
        />
        <label>
          VOTRE MESSAGE:
          <textarea name='comment'></textarea>
        </label>

        <button>Envoyer</button>
      </form>
    </div>
  )
}

export default Comment

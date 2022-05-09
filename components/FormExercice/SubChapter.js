import styles from '../../styles/Formation.module.css'
import FormInput from '../FormInput'

const SubChapter = props => {
  return (
    <div className={styles.chapterContainer}>
      <FormInput
        label='Titre Sous-Chapitre:'
        type='text'
        name='title'
        chapterIdx={props.chapterIdx}
        subchapterIdx={props.subchapterIdx}
        value={props.chapter.subchapters[props.subchapterIdx].title || ''}
        onChange={e =>
          props.onChangeSubChapter(e, props.chapterIdx, props.subchapterIdx)
        }
        // disabled={props.disableField}
        styles={styles}
      />

      <button
        className={`${styles.button} ${styles.secondaryRemoveBtn}`}
        type='button'
        onClick={e => props.removeSubChapter(e, props.chapterIdx, props.subchapterIdx)}
        // disabled={props.disableField}
      >
        Supp. sous-chap.
      </button>

    </div>
  )
}

export default SubChapter

import FormInput from '../FormInput'

import styles from '../../styles/Formation.module.css'

const Chapter = props => {
  return (
    <div className={styles.chapterContainer}>
      <FormInput
        label='Titre Chapitre:'
        type='text'
        name='title'
        value={props.title || ''}
        onChange={e => props.onChangeChapter(e, props.chapterIdx)}
        // disabled={props.disableField}
        styles={styles}
      />

      {props.urls.map((url, idx) => (
        <div key={idx}>
          <FormInput
            label='Video Url:'
            type='text'
            name='video'
            // value={props.courseData.chapters[props.chapterIdx].title || ''}
            // onChange={e => props.onChangeChapter(e, props.chapterIdx)}
            // disabled={props.disableField}
            styles={styles}
          />

          <button>Supprimer</button>
        </div>
      ))}

      <button
        className={`${styles.button} ${styles.secondaryRemoveBtn}`}
        type='button'
        onClick={() => props.removeChapter(props.chapterIdx)}
        disabled={props.disableField}
      >
        Supprimer chap.
      </button>
    </div>
  )
}

export default Chapter

import FormInput from '../FormInput'
import styles from '../../styles/Formation.module.css'

const Lecture = props => {
  const errorMessages = {
    urlMissing: 'Veuillez saisir le lien de la vidéo',
    patternMismatch: `Le lien doit commencer par "https://player.vimeo.com/video/" et se terminer par l'id de la vidéo`,
    vimeo: "Cette vidéo n'est pas répertoriée sur Vimeo"
  }

  const handleChange = e => {
    if (props.subchapterIdx !== undefined) {
      props.onChangeVideoSubChapter(
        e,
        props.chapterIdx,
        props.subchapterIdx,
        props.lectureIdx
      )
      return
    }

    props.onChangeVideo(e, props.chapterIdx, props.lectureIdx)
  }

  const handleRemove = e => {
    if (props.subchapterIdx !== undefined) {
      props.removeVideoSubChapter(
        e,
        props.chapterIdx,
        props.subchapterIdx,
        props.lectureIdx
      )
      return
    }

    props.removeVideo(e, props.chapterIdx, props.lectureIdx)
  }

  return (
    <div className={styles.lectureContainer}>
      <FormInput
        label='Video Url:'
        type='text'
        name='url'
        chapterIdx={props.chapterIdx}
        lectureIdx={props.lectureIdx}
        subchapterIdx={props.subchapterIdx}
        getDuration={props.getDuration}
        errorMessages={errorMessages}
        value={props.chapter.lectures[props.lectureIdx].url || ''}
        onChange={handleChange}
        required
        pattern='^https://player.vimeo.com/video/[0-9]+$'
        // disabled={props.disableField}
        styles={styles}
      />

      <button
        className={`${styles.button} ${styles.primatyRemoveBtn}`}
        type='button'
        onClick={handleRemove}
        // disabled={props.disableField}
      >
        Supp. vidéo
      </button>
    </div>
  )
}

export default Lecture

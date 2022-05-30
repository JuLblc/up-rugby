import FormInput from '../FormInput'
import styles from '../../styles/Formation.module.css'

const Lecture = props => {
  const errorMessages = {
    urlMissing: 'Veuillez saisir le lien de la vidéo',
    patternMismatch: `Le lien doit commencer par "https://www.youtube.com/watch?v=" et se terminer par l'id de la vidéo`,
    youtube: "Cette vidéo n'est pas répertoriée sur youTube"
  }

  const handleChange = e => {
    if (props.infrachapterIdx !== undefined) {
      props.onChangeVideoInfraChapter(
        e,
        props.chapterIdx,
        props.subchapterIdx,
        props.infrachapterIdx,
        props.lectureIdx
      )
      return
    }

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
    if (props.infrachapterIdx !== undefined) {
      props.removeVideoInfraChapter(
        e,
        props.chapterIdx,
        props.subchapterIdx,
        props.infrachapterIdx,
        props.lectureIdx
      )
      return
    }

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
        infrachapterIdx={props.infrachapterIdx}
        setDuration={props.setDuration}
        errorMessages={errorMessages}
        value={props.chapter.lectures[props.lectureIdx].url || ''}
        onChange={handleChange}
        required
        pattern='^https://www\.youtube\.com/watch[a-zA-Z0-9=?_&-]+$'
        mediaPlatform='youtube'
        disabled={props.disableField}
        styles={styles}
      />

      <button
        className={`${styles.button} ${styles.primatyRemoveBtn}`}
        type='button'
        onClick={handleRemove}
        disabled={props.disableField}
      >
        Supp. vidéo
      </button>
    </div>
  )
}

export default Lecture

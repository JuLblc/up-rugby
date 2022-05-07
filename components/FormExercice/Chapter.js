import FormInput from '../FormInput'
import Lecture from './Lecture'

import styles from '../../styles/Formation.module.css'

const Chapter = props => {

  const onChangeVideo = (e, chapterIdx, lectureIdx) => {
    console.log('e: ', e.target)
    const newExerciceData = { ...props.exerciceData }
    newExerciceData.chapters[chapterIdx].lectures[lectureIdx][e.target.name] =
      e.target.value
    props.updateStateFromChild(newExerciceData)
  }

  const removeVideo = (chapterIdx, videoIdx) => {
    console.log('params: ', chapterIdx, videoIdx)
    const newExerciceData = { ...props.exerciceData }
    newExerciceData.chapters[chapterIdx].lectures.splice(videoIdx, 1)

    props.updateStateFromChild(newExerciceData)
  }
  
  const getDuration = (duration, chapterIdx, lectureIdx) => {
    const newExerciceData = { ...props.exerciceData }
    newExerciceData.chapters[chapterIdx].lectures[lectureIdx].duration = duration
    props.updateStateFromChild(newExerciceData)
  }


  return (
    <div className={styles.chapterContainer}>
      <FormInput
        label='Titre Chapitre:'
        type='text'
        name='title'
        value={props.exerciceData.chapters[props.chapterIdx].title || ''}
        onChange={e => props.onChangeChapter(e, props.chapterIdx)}
        // disabled={props.disableField}
        styles={styles}
      />

      {props.exerciceData.chapters[props.chapterIdx].lectures.map(
        (lecture, lectureIdx) => (
          
          <Lecture
            key={lectureIdx}
            chapterIdx={props.chapterIdx}
            lectureIdx={lectureIdx}
            chapter={props.exerciceData.chapters[props.chapterIdx]}
            onChangeVideo={e => onChangeVideo(e, props.chapterIdx, lectureIdx)}
            removeVideo={() => removeVideo(props.chapterIdx, lectureIdx)}
            disableField={props.disableField}
            getDuration={getDuration}
          />
          
          // <div key={idx}>
          //   <FormInput
          //     label='Video Url:'
          //     type='text'
          //     name='url'
          //     value={props.exerciceData.chapters[props.chapterIdx]['name'] || ''}
          //     onChange={e => props.onChangeChapter(e, props.chapterIdx)}
          //     // disabled={props.disableField}
          //     styles={styles}
          //   />
          //   {idx !== props.urls.length - 1 && (
          //   <button
          //     className={`${styles.button} ${styles.secondaryRemoveBtn}`}
          //     type='button'
          //     onClick={() => removeVideo(props.chapterIdx, idx)}
          //     disabled={props.disableField}
          //   >
          //     Supprimer
          //   </button>
          // )}
          // </div>
        )
      )}

      <button
        className={`${styles.button} ${styles.primaryAddBtn}`}
        type='button'
        onClick={() => props.addVideo(props.chapterIdx)}
        disabled={props.disableField}
      >
        Ajouter
      </button>

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

import styles from '../../styles/Formation.module.css'
import FormInput from '../FormInput'
import Lecture from './Lecture'

const SubChapter = props => {
    
  const removeVideoSubChapter = (chapterIdx, subchapterIdx, videoIdx) => {
    console.log(chapterIdx, subchapterIdx, videoIdx)
    
    const newExerciceData = { ...props.exerciceData }
    newExerciceData.chapters[chapterIdx].subchapters[subchapterIdx].lectures.splice(videoIdx, 1)

    props.updateStateFromChild(newExerciceData)
  }

  return (
    <div className={styles.chapterContainer}>
      <FormInput
        label='Titre Sous-Chapitre:'
        type='text'
        name='title'
        // chapterIdx={props.chapterIdx}
        // subchapterIdx={props.subchapterIdx}
        value={props.chapter.subchapters[props.subchapterIdx].title || ''}
        onChange={e =>
          props.onChangeSubChapter(e, props.chapterIdx, props.subchapterIdx)
        }
        // disabled={props.disableField}
        styles={styles}
      />

      {props.chapter.subchapters[props.subchapterIdx].lectures.map(
        (lecture, lectureIdx) => (
          <Lecture
            key={lectureIdx}
            chapterIdx={props.chapterIdx}
            subchapterIdx={props.subchapterIdx}
            lectureIdx={lectureIdx}
            chapter={props.chapter.subchapters[props.subchapterIdx]}
            // onChangeVideo={e => onChangeVideo(e, props.chapterIdx, lectureIdx)}
            removeVideoSubChapter={() => removeVideoSubChapter(props.chapterIdx, props.subchapterIdx, lectureIdx)}
            // disableField={props.disableField}
            // getDuration={getDuration}
          />
        )
      )}

      <button
        className={`${styles.button} ${styles.primaryAddBtn}`}
        type='button'
        onClick={e =>
          props.addVideoToSubChapter(e, props.chapterIdx, props.subchapterIdx)
        }
        // disabled={props.disableField}
      >
        Ajouter Video
      </button>

      <button
        className={`${styles.button} ${styles.secondaryRemoveBtn}`}
        type='button'
        onClick={e =>
          props.removeSubChapter(e, props.chapterIdx, props.subchapterIdx)
        }
        // disabled={props.disableField}
      >
        Supp. sous-chap.
      </button>
    </div>
  )
}

export default SubChapter

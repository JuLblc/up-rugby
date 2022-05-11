import styles from '../../styles/Formation.module.css'
import FormInput from '../FormInput'
import Lecture from './Lecture'

const SubChapter = props => {
  const onChangeVideoSubChapter = (
    e,
    chapterIdx,
    subchapterIdx,
    lectureIdx
  ) => {

    console.log('e: ', e.target)
    const newExerciceData = { ...props.exerciceData }
    newExerciceData.chapters[chapterIdx].subchapters[subchapterIdx].lectures[
      lectureIdx
    ][e.target.name] = e.target.value
    props.updateStateFromChild(newExerciceData)
  }

  const removeVideoSubChapter = (chapterIdx, subchapterIdx, videoIdx) => {
    const newExerciceData = { ...props.exerciceData }
    newExerciceData.chapters[chapterIdx].subchapters[
      subchapterIdx
    ].lectures.splice(videoIdx, 1)

    props.updateStateFromChild(newExerciceData)
  }

  return (
    <div className={styles.chapterContainer}>
      <FormInput
        label='Titre Sous-Chapitre:'
        type='text'
        name='title'
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
            onChangeVideoSubChapter={e => onChangeVideoSubChapter(e, props.chapterIdx, props.subchapterIdx,lectureIdx)}
            removeVideoSubChapter={() =>
              removeVideoSubChapter(
                props.chapterIdx,
                props.subchapterIdx,
                lectureIdx
              )
            }
            // disableField={props.disableField}
            getDuration={props.getDuration}
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

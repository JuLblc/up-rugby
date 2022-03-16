import Lecture from './Lecture'
import FormInput from './FormInput'

import styles from '../styles/Chapter.module.css'

const Chapter = props => {
  //console.log('props Chapter: ', props)

  const onChangeVideo = (e, chapterIdx, lectureIdx) => {
    const newCourseData = { ...props.courseData }
    newCourseData.chapters[chapterIdx].lectures[lectureIdx][e.target.name] =
      e.target.value
    props.updateStateFromChild(newCourseData)
  }

  const getDuration = (duration, chapterIdx, lectureIdx) => {
    const newCourseData = { ...props.courseData }
    newCourseData.chapters[chapterIdx].lectures[lectureIdx].duration = duration
    props.updateStateFromChild(newCourseData)
  }

  const onChangeTipTapChapter = (content, chapterIdx, lectureIdx) => {
    const newCourseData = { ...props.courseData }
    newCourseData.chapters[chapterIdx].lectures[lectureIdx]['description'] = content
    props.updateStateFromChild(newCourseData)
  }

  const removeVideo = (chapterIdx, lectureIdx) => {
    const newCourseData = { ...props.courseData }
    newCourseData.chapters[chapterIdx].lectures.splice(lectureIdx, 1)
    props.updateStateFromChild(newCourseData)
  }

  return (
    <div className={styles.chapterContainer}>
      <FormInput
        label='Titre Chapitre:'
        type='text'
        name='title'
        value={props.courseData.chapters[props.chapterIdx].title || ''}
        onChange={e => props.onChangeChapter(e, props.chapterIdx)}
        disabled={props.disableField}
        styles={styles}
      />

      {props.courseData.chapters[props.chapterIdx].lectures.map(
        (lecture, lectureIdx) => (
          <Lecture
            key={lecture._id ? lecture._id : lectureIdx}
            chapterIdx={props.chapterIdx}
            lectureIdx={lectureIdx}      
            chapter={props.courseData.chapters[props.chapterIdx]}
            onChangeVideo={e => onChangeVideo(e, props.chapterIdx, lectureIdx)}
            removeVideo={() => removeVideo(props.chapterIdx, lectureIdx)}
            disableField={props.disableField}
            getDuration={getDuration}
            onChangeTipTap={(content) => onChangeTipTapChapter(content, props.chapterIdx, lectureIdx)}
          />
        )
      )}
      <button
        className='button-add-lecture'
        type='button'
        onClick={() => props.addVideo(props.chapterIdx)}
        disabled={props.disableField}
      >
        Ajouter Leçon
      </button>
      {props.chapterIdx ? (
        <button
          className='button-supp'
          type='button'
          onClick={() => props.removeChapter(props.chapterIdx)}
          disabled={props.disableField}
        >
          Supp chapitre
        </button>
      ) : null}
    </div>
  )
}

export default Chapter

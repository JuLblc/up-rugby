const Lecture = props => {
  //console.log('props Lecture: ', props)

  return (
    <div className='video-container'>
      <label>
        {' '}
        Titre leçon:
        <input
          type='text'
          name='title'
          value={props.chapter.lectures[props.lectureIdx].title || ''}
          onChange={e =>
            props.onChangeVideo(e, props.chapterIdx, props.lectureIdx)
          }
          disabled={props.disableField}
        />
      </label>

      <label>
        {' '}
        Description:
        <input
          type='text'
          name='description'
          value={props.chapter.lectures[props.lectureIdx].description || ''}
          onChange={e =>
            props.onChangeVideo(e, props.chapterIdx, props.lectureIdx)
          }
          disabled={props.disableField}
        />
      </label>

      <label>
        {' '}
        Video Url:
        <input
          type='text'
          name='url'
          value={props.chapter.lectures[props.lectureIdx].url || ''}
          onChange={e =>
            props.onChangeVideo(e, props.chapterIdx, props.lectureIdx)
          }
          disabled={props.disableField}
        />
      </label>

      {props.lectureIdx ? (
        <button
          className='button-supp'
          type='button'
          onClick={e =>
            props.removeVideo(e, props.chapterIdx, props.lectureIdx)
          }
          disabled={props.disableField}
        >
          Supp
        </button>
      ) : null}
    </div>
  )
}

export default Lecture

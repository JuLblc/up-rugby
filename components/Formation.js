import axios from 'axios'

import { useState } from 'react'
import { useRouter } from 'next/router';

import Chapter from './Chapter'

const Formation = props => {
  console.log('props: ', props)

  const router = useRouter();

  const [courseData, SetCourseData] = useState(props.courseContent)

  const onChange = e => {
    SetCourseData({ ...courseData, [e.target.name]: e.target.value })
  }

  const updateStateFromChild = newCourseData => {
    SetCourseData(newCourseData)
  }

  const onChangeChapter = (e, idx) => {
    const newCourseData = { ...courseData }
    newCourseData.chapters[idx][e.target.name] = e.target.value
    SetCourseData(newCourseData)
  }

  const addChapter = () => {
    
    const newCourseData = { ...courseData }
    newCourseData.chapters.push({
      title: '',
      lectures: [
        {
          title: '',
          description: '',
          url: ''
        }
      ]
    })
    SetCourseData(newCourseData)
  }
  const removeChapter = idx => {
    const newCourseData = { ...courseData }
    newCourseData.chapters.splice(idx, 1)
    SetCourseData(newCourseData)
  }

  const addVideo = idx => {
    const newCourseData = { ...courseData }
    newCourseData.chapters[idx].lectures.push({
      title: '',
      description: '',
      url: ''
    })
    SetCourseData(newCourseData)
  }

  const deleteCourse = () => {

    axios
        .delete('/api/courses', { data: courseData._id })
        .then(response => {
          console.log('response: ', response.data)
          router.push('/')
        })
        .catch(err => console.log('err: ', err))
  }

  const handleFormSubmit = e => {
    e.preventDefault()

    if (props.action === 'create') {
      axios
        .post('/api/courses', { course: courseData })
        .then(response => {
          console.log('response: ', response.data)
        })
        .catch(err => console.log('err: ', err))
    }
    if (props.action === 'update') {
        axios
        .put('/api/courses', { course: courseData })
        .then(response => {
          console.log('response: ', response.data)
        })
        .catch(err => console.log('err: ', err))
    }
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label>
          {' '}
          Titre Formation:
          <input
            type='text'
            name='title'
            value={courseData.title}
            onChange={onChange}
          />
        </label>

        <label>
          {' '}
          Catégorie:
          <input
            type='text'
            name='category'
            value={courseData.category}
            onChange={onChange}
          />
        </label>

        <label>
          {' '}
          Présentation:
          <input
            type='text'
            name='overview'
            value={courseData.overview}
            onChange={onChange}
          />
        </label>

        <label>
          {' '}
          Prix:
          <input
            type='number'
            name='price'
            value={courseData.price}
            onChange={onChange}
          />
        </label>

        {courseData.chapters.map((chapter, chapterIdx) => (
          <Chapter
            key={chapterIdx}
            chapterIdx={chapterIdx}
            courseData={courseData}
            updateStateFromChild={updateStateFromChild}
            onChangeChapter={e => onChangeChapter(e, chapterIdx)}
            removeChapter={() => removeChapter(chapterIdx)}
            addVideo={() => addVideo(chapterIdx)}
          />
        ))}

        <button
          className='button-add-chapter'
          type='button'
          onClick={addChapter}
        >
          Ajouter Chapitre
        </button>

        <button type='submit'>Save</button>

        <button
        className='button-delete'
        type='button'
          onClick={deleteCourse}
        >Supprimer formation</button>
      </form>
    </>
  )
}

export default Formation

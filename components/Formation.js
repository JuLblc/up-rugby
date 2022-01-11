import axios from 'axios'

import { useState } from 'react'
import { useRouter } from 'next/router'

import Chapter from './Chapter'

import styles from '../styles/Formation.module.css'

const Formation = props => {
  // console.log('3. props Formation: ', props)

  const router = useRouter()

  const [courseData, setCourseData] = useState(props.courseContent)
  const [disableField, setDisableField] = useState(props.disable)

  const onChange = e => {
    console.log(e.target)
    setCourseData({ ...courseData, [e.target.name]: e.target.value })
  }

  const updateStateFromChild = newCourseData => {
    setCourseData(newCourseData)
  }

  const onChangeChapter = (e, idx) => {
    const newCourseData = { ...courseData }
    newCourseData.chapters[idx][e.target.name] = e.target.value
    setCourseData(newCourseData)
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
    setCourseData(newCourseData)
  }
  const removeChapter = idx => {
    const newCourseData = { ...courseData }
    newCourseData.chapters.splice(idx, 1)
    setCourseData(newCourseData)
  }

  const addVideo = idx => {
    const newCourseData = { ...courseData }
    newCourseData.chapters[idx].lectures.push({
      title: '',
      description: '',
      url: ''
    })
    setCourseData(newCourseData)
  }

  const deleteCourse = () => {
    axios
      .delete('/api/courses', { data: courseData._id })
      .then(response => {
        console.log('response: ', response.data)
        router.push('/courses')
      })
      .catch(err => console.log('err: ', err))
  }

  const updateCourse = () => {
    setDisableField(false)
  }

  const publishCourse = () => {
    const newCourseData = { ...courseData }
    newCourseData.isPublished = true
    setCourseData(newCourseData)

    axios
      .put('/api/courses', { course: newCourseData })
      .then(response => {
        console.log('response publish: ', response.data)
        router.push('/courses')
      })
      .catch(err => console.log('err: ', err))
  }

  const handleFormSubmit = e => {
    e.preventDefault()

    setDisableField(true)

    if (!courseData.isPublished) {
      if (props.action === 'create') {
        axios
          .post('/api/courses', { course: courseData })
          .then(response => {
            console.log('response: ', response.data)
            router.push(
              `/courses/update-course/${response.data.newCourseFromDB._id}`
            )
          })
          .catch(err => console.log('err: ', err))
      }

      if (props.action === 'update') {
        axios
          .put('/api/courses', { course: courseData })
          .then(response => {
            console.log('response: ', response.data)
            router.push(
              `/courses/update-course/${response.data.updatedCourseFromDB._id}`
            )
          })
          .catch(err => console.log('err: ', err))
      }
    }

    // if (courseData.isPublished) {
    //   // Créer un nouveau cours avec ces infos + isPublished = false
    //   console.log('creation copy draft')

    //   const newCourseData = { ...courseData }
    //   delete newCourseData._id
    //   newCourseData.isPublished = false
    //   setCourseData(newCourseData)

    //   axios
    //     .post('/api/courses', { course: newCourseData })
    //     .then(response => {
    //       console.log('1. response: ', response.data)
    //       router.push(
    //         `/courses/update-course/${response.data.newCourseFromDB._id}`
    //       )
    //     })
    //     .catch(err => console.log('err: ', err))
    // }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label>
          {' '}
          Titre Formation:
          <input
            className={styles.formationTitle}
            type='text'
            name='title'
            value={courseData.title}
            onChange={onChange}
            disabled={disableField}
          />
        </label>

        <div>
          <label>
            {' '}
            Catégorie:
            {/* <input
              type='text'
              name='category'
              value={courseData.category}
              onChange={onChange}
              disabled={disableField}
            /> */}
            <select
              name='category'
              value={courseData.category}
              onChange={onChange}
              disabled={disableField}
            >
              <option value='Attaque'>Attaque</option>
              <option value='Défense'>Défense</option>
              <option value='Principe'>Principe</option>
              <option value='Système de jeu'>Système de jeu</option>
            </select>
          </label>

          <label>
            {' '}
            Prix:
            <input
              type='number'
              name='price'
              value={courseData.price}
              onChange={onChange}
              disabled={disableField}
            />
          </label>
        </div>

        <label>
          {' '}
          Présentation:
          <input
            type='text'
            name='overview'
            value={courseData.overview}
            onChange={onChange}
            disabled={disableField}
          />
        </label>

        {courseData.chapters.map((chapter, chapterIdx) => (
          <Chapter
            key={chapter._id ? chapter._id : chapterIdx}
            chapterIdx={chapterIdx}
            courseData={courseData}
            updateStateFromChild={updateStateFromChild}
            onChangeChapter={e => onChangeChapter(e, chapterIdx)}
            removeChapter={() => removeChapter(chapterIdx)}
            addVideo={() => addVideo(chapterIdx)}
            disableField={disableField}
          />
        ))}

        <button
          className='button-add-chapter'
          type='button'
          onClick={addChapter}
          disabled={disableField}
        >
          Ajouter Chapitre
        </button>

        {/*  Display 'save' button until course is save in DB*/}
        {props.action === 'create' && (
          <button type='submit'>Enregistrer</button>
        )}

        {props.action === 'update' && (
          <>
            {disableField ? (
              <>
                {/* Fields are disabled and buttons are displayed */}
                <button type='button' onClick={publishCourse}>
                  Publier
                </button>

                <button type='button' onClick={updateCourse}>
                  Modifier
                </button>
              </>
            ) : (
              <>
                {/* Fields are enabled and buttons are displayed */}
                <button type='submit'>Enregistrer</button>
              </>
            )}

            <button
              className='button-delete'
              type='button'
              onClick={deleteCourse}
            >
              Supprimer formation
            </button>
          </>
        )}
      </form>
    </>
  )
}

export default Formation

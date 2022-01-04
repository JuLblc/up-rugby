import axios from 'axios'

import { useState } from 'react'
import { useRouter } from 'next/router'

import Chapter from './Chapter'

const Formation = props => {
  console.log('props: ', props)

  const router = useRouter()

  const [courseData, setCourseData] = useState(props.courseContent)
  const [disableField, setDisableField] = useState(props.disable)

  const onChange = e => {
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
    console.log('update me')
    setDisableField(false)
  }

  const handleFormSubmit = e => {
    e.preventDefault()

    // Au click sur bouton 'enregistrer'
    setDisableField(true)

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
            disabled={disableField}
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
            disabled={disableField}
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
            disabled={disableField}
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
            disabled={disableField}
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

        {/*  Display 'save' button until course is save in DB*/}
        {props.action === 'create' && (
          <button type='submit'>Enregistrer</button>
        )}

        {props.action === 'update' && (
          <>
            {disableField ? (
              <>
                <button type='submit'>Publier</button>

                <button type='button' onClick={updateCourse}>
                  Modifier
                </button>
              </>
            ) : (
              <button type='submit'>Enregistrer</button>
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

        {/* 
        1. save => redirect vers page upadte => OK
                => afficher bouton 'publish' => au click MAJ du cours state = published ( au 1er passage pas de version published)
                => champs ne sont plus modifiable + bouton modifier => au click champs modifiable + afficher bouton save
                => créer un copy avec state = draft + afficher bouton 'publish' => au click MAJ du cours state = published + supp draft
                    !!! Il faut garder le même n° d'id !!!

        */}
      </form>
    </>
  )
}

export default Formation

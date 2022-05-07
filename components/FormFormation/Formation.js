import { useState } from 'react'
import { useRouter } from 'next/router'

import Chapter from './Chapter'
import Upload from '../Upload'
import Tiptap from '../Tiptap'
import FormInput from '../FormInput'

import { toSeoUrl } from '../../utils/utilSeoUrl'
import { postCourse, putCourse, removeCourse } from '../../apiCall/courses'
import { postUpload } from '../../apiCall/uploads'

import styles from '../../styles/Formation.module.css'

const Formation = props => {
  const router = useRouter()

  const [courseData, setCourseData] = useState(props.courseContent)
  const [disableField, setDisableField] = useState(props.disable)
  const [fileInput, setFileInput] = useState([])
  const [pictInput, setPictInput] = useState()

  const errorMessages = {
    titleMissing: 'Veuillez saisir le titre',
    descriptionMissing: 'Veuillez saisir la description'
  }

  const onChange = e => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value })
  }

  const updateStateFromChild = newCourseData => {
    setCourseData(newCourseData)
  }

  const onChangeTipTap = newOverview => {
    const newCourseData = { ...courseData }
    newCourseData.overview = newOverview
    setCourseData(newCourseData)
  }

  const onChangeChapter = (e, idx) => {
    const newCourseData = { ...courseData }
    newCourseData.chapters[idx][e.target.name] = e.target.value
    setCourseData(newCourseData)
  }

  const onChangeUploadPict = picture => {
    setPictInput(picture)
  }

  const onChangeUploadFile = file => {
    const newFileInputs = [...fileInput]
    newFileInputs.push(file)
    setFileInput(newFileInputs)
  }

  const addChapter = () => {
    const newCourseData = { ...courseData }
    newCourseData.chapters.push({
      title: '',
      seoUrl: '',
      lectures: [
        {
          title: '',
          seoUrl: '',
          description: '',
          url: '',
          duration: 0
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

  const removeAttachement = (idx, fileToRemove) => {
    //Remove from courseData
    const newCourseData = { ...courseData }
    newCourseData.attachements.splice(idx, 1)
    setCourseData(newCourseData)

    //Remove from fileInput
    const newFileInputs = [...fileInput]
    const index = newFileInputs
      .map(file => file.name)
      .indexOf(fileToRemove.fileName)

    if (index !== -1) {
      newFileInputs.splice(index, 1)
      setFileInput(newFileInputs)
    }
  }

  const removePict = () => {
    //Remove from courseData
    const newCourseData = { ...courseData }
    newCourseData.img = {}
    setCourseData(newCourseData)

    setPictInput(undefined)
  }

  const addVideo = idx => {
    const newCourseData = { ...courseData }
    newCourseData.chapters[idx].lectures.push({
      title: '',
      seoUrl: '',
      description: '',
      url: '',
      duration: 0
    })
    setCourseData(newCourseData)
  }

  const deleteCourse = async () => {
    await removeCourse(courseData)
    router.push('/courses')
  }

  const updateCourse = () => {
    setDisableField(false)
  }

  const publishCourse = async () => {
    const newCourseData = { ...courseData }
    newCourseData.isPublished = true
    setCourseData(newCourseData)

    await putCourse(newCourseData)
    router.push('/courses')
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    if (courseData.title === '' || courseData.description === '') {
      console.log('Champs titre & description ne peuvent être vide')
      return
    }

    //Set Url for SEO
    const newCourseData = { ...courseData }
    newCourseData.seoUrl = toSeoUrl(courseData.title)
    newCourseData.chapters.map(chapter => {
      chapter.seoUrl = toSeoUrl(chapter.title)
      chapter.lectures.map(lecture => {
        lecture.seoUrl = toSeoUrl(lecture.title)
      })
    })

    setDisableField(true)

    // 1. Files upload to Cloudinary & get secure urls
    if (fileInput.length > 0) {
      const formDataFile = new FormData()

      for (const file of fileInput) {
        formDataFile.append('file', file)
      }

      const resUploadFile = await postUpload(
        formDataFile,
        '/uprugby-uploads-ppt',
        'raw'
      )

      newCourseData.attachements
        .filter(file => file.url === undefined)
        .map((file, idx) => (file.url = resUploadFile.data.secureUrls[idx]))
    }

    //2. Picture upload to Cloudinary & get secure urls
    if (pictInput) {
      const formDataPict = new FormData()
      formDataPict.append('file', pictInput)

      const resUploadPict = await postUpload(
        formDataPict,
        '/uprugby-uploads-pict-formation',
        'image'
      )

      newCourseData.img.url = resUploadPict.data.url
      newCourseData.img.width = resUploadPict.data.width
      newCourseData.img.height = resUploadPict.data.height
    }

    //3. Save in DB
    if (!courseData.isPublished) {
      if (props.action === 'create') {
        const resCreate = await postCourse(newCourseData)
        router.push(
          `/courses/update-course/${resCreate.data.newCourseFromDB.seoUrl}`
        )
      }

      if (props.action === 'update') {
        const resUpdate = await putCourse(newCourseData)
        router.push(
          `/courses/update-course/${resUpdate.data.updatedCourseFromDB.seoUrl}`
        )
      }
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <FormInput
          label='Titre Formation:'
          type='text'
          name='title'
          errorMessages={errorMessages}
          required={true}
          value={courseData.title}
          onChange={onChange}
          disabled={disableField}
          styles={styles}
        />

        <FormInput
          label='Description:'
          type='text'
          name='description'
          errorMessages={errorMessages}
          required={true}
          value={courseData.description}
          onChange={onChange}
          disabled={disableField}
          styles={styles}
        />

        <div>
          <label>
            <span>Catégorie:</span>
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

          <FormInput
            label='Prix:'
            type='number'
            name='price'
            value={courseData.price}
            onChange={onChange}
            disabled={disableField}
            styles={styles}
          />
        </div>

        <Upload
          label='Ajouter'
          data={courseData}
          remove={removePict}
          updateStateFromChild={updateStateFromChild}
          onChange={onChangeUploadPict}
          uploadFileName='picture'
          disabled={disableField}
          acceptedFileTypes='image/*'
        />

        <label>
          <span>Présentation:</span>
          <Tiptap
            content={courseData.overview}
            onChangeTipTap={onChangeTipTap}
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
          className={`${styles.button} ${styles.addBtn}`}
          type='button'
          onClick={addChapter}
          disabled={disableField}
        >
          Ajouter Chapitre
        </button>

        <Upload
          label='Ajouter'
          data={courseData}
          remove={removeAttachement}
          updateStateFromChild={updateStateFromChild}
          onChange={onChangeUploadFile}
          uploadFileName='file'
          disabled={disableField}
          acceptedFileTypes='.ppt, .pptx, .pdf'
        />

        {/*  Display 'save' button until course is save in DB*/}
        {props.action === 'create' && (
          <button
            type='submit'
            className={`${styles.button} ${styles.saveBtn}`}
          >
            Enregistrer
          </button>
        )}

        {props.action === 'update' && (
          <>
            {disableField ? (
              <>
                {/* Fields are disabled and buttons are displayed */}
                <button
                  type='button'
                  className={`${styles.button} ${styles.publishBtn}`}
                  onClick={publishCourse}
                >
                  Publier
                </button>

                <button
                  type='button'
                  className={`${styles.button} ${styles.modifyBtn}`}
                  onClick={updateCourse}
                >
                  Modifier
                </button>
              </>
            ) : (
              <>
                {/* Fields are enabled and buttons are displayed */}
                <button
                  type='submit'
                  className={`${styles.button} ${styles.saveBtn}`}
                >
                  Enregistrer
                </button>
              </>
            )}

            <button
              className={`${styles.button} ${styles.removeBtn}`}
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

import { useState } from 'react'
import { useRouter } from 'next/router'

import { postExercice } from '../../apiCall/exercices'
import { toSeoUrl } from '../../utils/utilSeoUrl'
import { postUpload } from '../../apiCall/uploads'

import Chapter from './Chapter'
import FormInput from '../FormInput'
import Upload from '../Upload'

import styles from '../../styles/Formation.module.css'

const Exercice = props => {
  const router = useRouter()

  const [exerciceData, setExerciceData] = useState(props.exerciceContent)
  // const [disableField, setDisableField] = useState(props.disable)
  const [pictInput, setPictInput] = useState()

  const errorMessages = {
    titleMissing: 'Veuillez saisir le titre',
    descriptionMissing: 'Veuillez saisir la description'
  }

  const onChange = e => {
    setExerciceData({ ...exerciceData, [e.target.name]: e.target.value })
  }

  const updateStateFromChild = newExerciceData => {
    setExerciceData(newExerciceData)
  }

  const onChangeChapter = (e, idx) => {
    const newExerciceData = { ...exerciceData }
    newExerciceData.chapters[idx][e.target.name] = e.target.value
    setExerciceData(newExerciceData)
  }

  const addChapter = () => {
    const newExerciceData = { ...exerciceData }
    newExerciceData.chapters.push({
      title: '',
      lectures: [],
      subchapters: []
    })
    setExerciceData(newExerciceData)
  }

  const removeChapter = idx => {
    const newExerciceData = { ...exerciceData }
    newExerciceData.chapters.splice(idx, 1)
    setExerciceData(newExerciceData)
  }

  const addVideo = idx => {
    const newExerciceData = { ...exerciceData }
    newExerciceData.chapters[idx].lectures.push({ url: '', duration: 0 })
    setExerciceData(newExerciceData)
  }

  const addSubChapter = idx => {
    const newExerciceData = { ...exerciceData }
    newExerciceData.chapters[idx].subchapters.push({
      title: '',
      lectures: [],
      subchapters: []
    })
    setExerciceData(newExerciceData)
  }

  const onChangeUploadPict = picture => {
    setPictInput(picture)
  }

  const removePict = () => {
    //Remove from exerciceData
    const newExerciceData = { ...exerciceData }
    newExerciceData.img = {}
    setExerciceData(newExerciceData)

    setPictInput(undefined)
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    //Set Url for SEO
    const newExerciceData = { ...exerciceData }
    newExerciceData.seoUrl = toSeoUrl(exerciceData.title)

    //1. Picture upload to Cloudinary & get secure urls
    if (pictInput) {
      const formDataPict = new FormData()
      formDataPict.append('file', pictInput)

      const resUploadPict = await postUpload(
        formDataPict,
        '/uprugby-uploads-pict-exercice',
        'image'
      )

      newExerciceData.img.url = resUploadPict.data.url
      newExerciceData.img.width = resUploadPict.data.width
      newExerciceData.img.height = resUploadPict.data.height
    }

    //2. Save in DB
    if (props.action === 'create') {
      const resCreate = await postExercice(newExerciceData)
      console.log('resCreate: ', resCreate)
      // router.push(
      //   `/courses/update-exercice/${resCreate.data.newExerciceFromDB.seoUrl}`
      // );
    }
  }

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <FormInput
        label='Titre Catégorie:'
        type='text'
        name='title'
        errorMessages={errorMessages}
        required={true}
        value={exerciceData.title}
        onChange={onChange}
        // disabled={disableField}
        styles={styles}
      />

      <FormInput
        label='Description:'
        type='text'
        name='description'
        errorMessages={errorMessages}
        required={true}
        value={exerciceData.description}
        onChange={onChange}
        // disabled={disableField}
        styles={styles}
      />

      <Upload
        label='Ajouter'
        data={exerciceData}
        remove={removePict}
        updateStateFromChild={updateStateFromChild}
        onChange={onChangeUploadPict}
        uploadFileName='picture'
        // disabled={disableField}
        acceptedFileTypes='image/*'
      />

      {exerciceData.chapters.map((chapter, chapterIdx) => (
        <Chapter
          key={chapterIdx}
          chapterIdx={chapterIdx}
          urls={chapter.videoUrls}
          exerciceData={exerciceData}
          updateStateFromChild={updateStateFromChild}
          onChangeChapter={e => onChangeChapter(e, chapterIdx)}
          removeChapter={() => removeChapter(chapterIdx)}
          addVideo={() => addVideo(chapterIdx)}
          addSubChapter={() => addSubChapter(chapterIdx)}
          // disableField={disableField}
        />
      ))}

      <button
        className={`${styles.button} ${styles.addBtn}`}
        type='button'
        onClick={addChapter}
        // disabled={disableField}
      >
        Ajouter Chapitre
      </button>

      {props.action === 'create' && (
        <button type='submit' className={`${styles.button} ${styles.saveBtn}`}>
          Enregistrer
        </button>
      )}
    </form>
  )
}

export default Exercice

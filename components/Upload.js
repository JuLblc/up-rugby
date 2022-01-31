import axios from 'axios'
import { useRef } from 'react'

import styles from '../styles/Upload.module.css'

const Upload = props => {
  const fileInputRef = useRef(null)
  const formRef = useRef(null)

  const onClickHandler = () => {
    fileInputRef.current?.click()
  }

  const onChangeHandler = async event => {
    if (!event.target.files?.length) {
      return
    }

    const fileInput = event.currentTarget
    console.log('fileInput: ', fileInput.files)

    // const formData = new FormData()
    // formData.append('file', fileInput.files[0])
    props.onChange(fileInput.files[0])

    const newCourseData = { ...props.courseData }
    newCourseData.attachements.push({ fileName: fileInput.files[0].name })
    props.updateStateFromChild(newCourseData)

    // axios
    //   .post('/api/uploads', formData)
    //   .then(response => {
    //     console.log('response: ', response.data)
    //     const newCourseData = { ...props.courseData }
    //     newCourseData.attachements.push(response.data.uploadedFile.secure_url)
    //     props.updateStateFromChild(newCourseData)
    //   })
    //   .catch(err => console.log(err))

    // formRef.current?.reset();
  }

  return (
    <div className={styles.uploadContainer} ref={formRef}>
      {/* Display exisiting attachements */}
      {props.courseData.attachements.map(file => (
        <div key={file.fileName}>
          <p>{file.fileName}</p>
          <button type='button' disabled={props.disabled}>
            Supp fichier
          </button>
        </div>
      ))}

      <button type='button' onClick={onClickHandler} disabled={props.disabled}>
        {props.label}
      </button>
      <input
        // accept={props.acceptedFileTypes}
        // multiple={props.allowMultipleFiles}
        name={props.uploadFileName}
        onChange={onChangeHandler}
        ref={fileInputRef}
        type='file'
      />
    </div>
  )
}

export default Upload

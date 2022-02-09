import axios from 'axios'
import { useRef } from 'react'

import styles from '../styles/Upload.module.css'

const Upload = props => {
  const fileInputRef = useRef(null)
  const divRef = useRef(null)

  const onClickHandler = () => {
    fileInputRef.current?.click()
  }

  const onChangeHandler = async event => {
    if (!event.target.files?.length) {
      return
    }

    const fileInput = event.currentTarget
    console.log('fileInput: ', fileInput.files)

    props.onChange(fileInput.files[0])

    const newCourseData = { ...props.courseData }

    if (props.uploadFileName === 'file') {
      newCourseData.attachements.push({ fileName: fileInput.files[0].name })
    }

    if (props.uploadFileName === 'picture') {
      newCourseData.img.fileName = fileInput.files[0].name
    }

    props.updateStateFromChild(newCourseData)

    event.target.value = null
  }

  return (
    <div className={styles.uploadContainer} ref={divRef}>
      {/* Display exisiting picture */}
      {props.uploadFileName === 'picture' && props.courseData.img.fileName && (
        <div >
          <p>{props.courseData.img.fileName}</p>
          <button
            type='button'
            disabled={props.disabled}
            onClick={() => props.removeAttachement(idx, file)}
          >
            Supp photo!
          </button>
        </div>
      )}

      {/* Display exisiting attachements */}
      {props.uploadFileName === 'file' && props.courseData.attachements.map((file, idx) => (
        <div key={file.fileName}>
          <p>{file.fileName}</p>
          <button
            type='button'
            disabled={props.disabled}
            onClick={() => props.removeAttachement(idx, file)}
          >
            Supp fichier!
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

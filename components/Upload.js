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
    
    const formData = new FormData()
    formData.append('file', fileInput.files[0])
    formData.append('upload_preset', 'uprugby-uploads')
    
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/raw/upload`

    axios
      .post(url, formData)
      .then(response => {
        console.log('response: ', response)
      })
      .catch(err => console.log(err))

    // props.onChange(formData)

    // formRef.current?.reset();
  }

  return (
    <div className={styles.uploadContainer} ref={formRef}>
      <button type='button' onClick={onClickHandler}>
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

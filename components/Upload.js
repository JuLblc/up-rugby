import { useRef } from 'react'

import styles from '../styles/Upload.module.css'

const Upload = props => {
  const fileInputRef = useRef(null)
  const formRef = useRef(null)

  const onClickHandler = () => {
    fileInputRef.current?.click()
  }

  const onChangeHandler = event => {
    console.log('event: ', event.target)
    if (!event.target.files?.length) {
      return
    }

    const formData = new FormData()

    Array.from(event.target.files).forEach(file => {
      formData.append(event.target.name, file)
    })

    props.onChange(formData);

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

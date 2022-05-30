import { useState, useEffect } from 'react'
import { getVimeoVideo } from '../apiCall/vimeo'
import { getYoutubeVideo } from '../apiCall/youtube'
import { convertISO8601ToSec } from '../utils/utilCourses'


const FormInput = props => {
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordShown, setPasswordShown] = useState({
    type: props.type,
    show: false,
    eyeType: 1
  })

  const {
    errorMessages,
    onChange,
    id,
    svg,
    reset,
    type,
    label,
    chapterIdx,
    lectureIdx,
    subchapterIdx,
    infrachapterIdx,
    mediaPlatform,
    setDuration,
    styles,
    ...inputProps
  } = props

  useEffect(() => {
    setErrorMessage('')
    setFocused(false)
    setError(false)
  }, [reset])

  const handleOnBlur = async e => {
    setFocused(true)

    !e.target.validity.valid ? setError(true) : setError(false)

    if (e.target.validity.patternMismatch) {
      setErrorMessage(errorMessages.patternMismatch)
      return
    }

    if (e.target.validity.valueMissing && e.target.name === 'email') {
      setErrorMessage(errorMessages.emailMissing)
      return
    }

    if (e.target.validity.valueMissing && e.target.name === 'password') {
      setErrorMessage(errorMessages.passwordMissing)
      return
    }

    if (e.target.validity.valueMissing && e.target.name === 'title') {
      setErrorMessage(errorMessages.titleMissing)
      return
    }

    if (e.target.validity.valueMissing && e.target.name === 'description') {
      setErrorMessage(errorMessages.descriptionMissing)
      return
    }

    if (e.target.validity.valueMissing && e.target.name === 'url') {
      setErrorMessage(errorMessages.urlMissing)
      return
    }

    if (!e.target.validity.valid) {
      setErrorMessage(errorMessages.valid)
      return
    }

    //Check video exist on vimeo
    if (e.target.name === 'url' && mediaPlatform === 'vimeo') {
      let vimeoId = e.target.value.substring(31, e.target.value.length)

      let resVimeo = await getVimeoVideo(vimeoId)

      if (!resVimeo) {
        setError(true)
        setErrorMessage(errorMessages.vimeo)
        return
      }

      let durationToUpperMin = Math.ceil(resVimeo.data.duration / 60)

      setDuration(durationToUpperMin, props.chapterIdx, props.lectureIdx)
    }

    //Check video exist on youtube
    if (e.target.name === 'url' && mediaPlatform === 'youtube') {
      let youtubeId = e.target.value.substring(32, 43)

      let resYoutube = await getYoutubeVideo(youtubeId)

      if (!resYoutube.data.items.length) {
        setError(true)
        setErrorMessage(errorMessages.youtube)
        return
      }

      let duration = resYoutube.data.items[0].contentDetails.duration

      let durationToUpperMin = Math.ceil(convertISO8601ToSec(duration) / 60)

      if (props.infrachapterIdx !== undefined) {
        setDuration(
          durationToUpperMin,
          props.chapterIdx,
          props.lectureIdx,
          props.subchapterIdx,
          props.infrachapterIdx
        )
        return
      }

      if (props.subchapterIdx !== undefined) {
        setDuration(
          durationToUpperMin,
          props.chapterIdx,
          props.lectureIdx,
          props.subchapterIdx
        )
        return
      }

      setDuration(durationToUpperMin, props.chapterIdx, props.lectureIdx)
    }
  }

  const onEyeClick = () => {
    if (passwordShown.type === 'password') {
      setPasswordShown({
        type: 'text',
        show: !passwordShown.show,
        eyeType: 2
      })
      return
    }

    if (passwordShown.type !== 'password') {
      setPasswordShown({
        type: 'password',
        show: !passwordShown.show,
        eyeType: 1
      })
      return
    }
  }

  return (
    <>
      <label>
        {svg && svg[0]}
        <span>{label}</span>
        <input
          className={styles.input}
          {...inputProps}
          type={type === 'password' ? passwordShown.type : type}
          onChange={onChange}
          onBlur={handleOnBlur}
          focused={focused.toString()}
        />
        {svg && svg.length > 1 && (
          <span onClick={onEyeClick}>{svg[passwordShown.eyeType]}</span>
        )}
      </label>

      <div
        className={`${styles.message} ${
          error ? styles.onError : styles.onSuccessClient
        }`}
      >
        <svg
          className={styles.icon}
          width='20'
          height='21'
          viewBox='0 0 20 21'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10 2.60596C9.661 2.60596 9.32868 2.70028 9.04023 2.87836C8.75177 3.05645 8.51855 3.31128 8.36665 3.61435L8.36633 3.61498L2.44277 15.4621L2.44269 15.4623C2.30353 15.7407 2.23784 16.0502 2.25185 16.3612C2.26586 16.6721 2.3591 16.9744 2.52272 17.2392C2.68635 17.5041 2.91493 17.7227 3.18678 17.8744C3.45863 18.0261 3.76473 18.1058 4.07604 18.106H4.07644H15.9236H15.924C16.2353 18.1058 16.5414 18.0261 16.8132 17.8744C17.0851 17.7227 17.3137 17.5041 17.4773 17.2392C17.6409 16.9744 17.7341 16.6721 17.7481 16.3612C17.7622 16.0502 17.6965 15.7407 17.5573 15.4623L17.5572 15.4621L11.6337 3.61498L11.6333 3.61435C11.4815 3.31128 11.2482 3.05645 10.9598 2.87836C10.6713 2.70028 10.339 2.60596 10 2.60596ZM9.82821 4.15471C9.87984 4.12284 9.93932 4.10596 10 4.10596C10.0607 4.10596 10.1202 4.12284 10.1718 4.15471C10.2233 4.18654 10.265 4.23207 10.2922 4.28622L10.2923 4.28645L16.2155 16.1328L16.2156 16.1329C16.2404 16.1827 16.2522 16.2381 16.2497 16.2937C16.2472 16.3493 16.2305 16.4034 16.2012 16.4508C16.1719 16.4982 16.131 16.5374 16.0823 16.5645C16.0337 16.5917 15.9789 16.6059 15.9232 16.606H4.07684C4.02112 16.6059 3.96633 16.5917 3.91767 16.5645C3.86901 16.5374 3.8281 16.4982 3.79881 16.4508C3.76953 16.4034 3.75284 16.3493 3.75033 16.2937C3.74783 16.2381 3.75956 16.1827 3.78441 16.1329L3.78449 16.1328L9.70765 4.28645L9.70777 4.2862C9.73496 4.23206 9.77666 4.18654 9.82821 4.15471ZM10 7.45135C10.4142 7.45135 10.75 7.78714 10.75 8.20135V11.4324C10.75 11.8466 10.4142 12.1824 10 12.1824C9.58579 12.1824 9.25 11.8466 9.25 11.4324V8.20135C9.25 7.78714 9.58579 7.45135 10 7.45135ZM9.2303 13.8937C9.43444 13.6896 9.7113 13.5749 9.99999 13.5749C10.2887 13.5749 10.5655 13.6896 10.7697 13.8937C10.9738 14.0979 11.0885 14.3747 11.0885 14.6634C11.0885 14.9521 10.9738 15.229 10.7697 15.4331C10.5655 15.6372 10.2887 15.7519 9.99999 15.7519C9.7113 15.7519 9.43444 15.6372 9.2303 15.4331C9.02617 15.229 8.91149 14.9521 8.91149 14.6634C8.91149 14.3747 9.02617 14.0979 9.2303 13.8937ZM9.99999 14.6749C10.003 14.6749 10.006 14.6737 10.0081 14.6715C10.0103 14.6694 10.0115 14.6665 10.0115 14.6634C10.0115 14.6604 10.0103 14.6574 10.0081 14.6553C10.006 14.6531 10.003 14.6519 9.99999 14.6519C9.99695 14.6519 9.99402 14.6531 9.99187 14.6553C9.98971 14.6574 9.9885 14.6604 9.9885 14.6634C9.9885 14.6665 9.98971 14.6694 9.99187 14.6715C9.99402 14.6737 9.99695 14.6749 9.99999 14.6749Z'
            fill={error ? '#E44258' : '#00CA72'}
          />
        </svg>

        <span>{errorMessage}</span>
      </div>
    </>
  )
}

export default FormInput

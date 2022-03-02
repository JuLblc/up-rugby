import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import { getAuthReset, putAuthReset } from '../../apiCall/auth'

import FormInput from '../../components/FormInput'

import styles from '../../styles/Login.module.css'

const Reset = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayForm: false,
    message: ''
  })

  const router = useRouter()
  const { token } = router.query

  const { email, password, displayForm, message } = formData


  const getEmail = useCallback(async () => {
    if (token) {
      const resGetAuthReset = await getAuthReset(token)

      setFormData({
        ...formData,
        email: resGetAuthReset.data?.email,
        message: resGetAuthReset.data?.message,
        displayForm: resGetAuthReset.data?.displayForm
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    getEmail()
  }, [getEmail])

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleFormSubmit = async e => {
    e.preventDefault()

    const resPutAuthReset = await putAuthReset(password, token)
    setFormData({
      ...formData,
      email: resPutAuthReset.data?.email,
      message: resPutAuthReset.data?.message,
      displayForm: resPutAuthReset.data?.displayForm
    })
  }

  return (
    <main className={styles.authContainer}>
      <h1>Réinitialisation mot de passe</h1>

      {displayForm && (
        <form onSubmit={handleFormSubmit}>
          <p>
            Bonjour, vous avez demandé la réinitialisation du mot de passe
            associé à l'adresse E-mail: {email}
          </p>

          <FormInput
            type='password'
            name='password'
            placeholder='Mot de passe'
            value={password}
            onChange={onChange}
            errorMessages= {{            
              patternMismatch:
                'Le mot de passe doit contenir au moins 6 caractères, un chiffre, une lettre et un caractère spécial',
              valueMissing: 'Veuillez saisir votre mot de passe',
              valid: null
            }}
            pattern= {`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`}
            required= {true}
            // reset= reset
            svg={ [
              <svg
                className={styles.icon}
                key='0'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path
                  d='M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zm-2 0V9A5 5 0 0 0 7 9v1h10zm-6 4v4h2v-4h-2z'
                  fill='rgba(103,104,121,1)'
                />
              </svg>,
              <svg
                className={`${styles.icon} ${styles.eye}`}
                key='1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path
                  d='M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
                  fill='rgba(128,128,128,1)'
                />
              </svg>,
              <svg
                className={`${styles.icon} ${styles.eye}`}
                key='2'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path
                  d='M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z'
                  fill='rgba(128,128,128,1)'
                />
              </svg>
            ]}
          />
          <button className={styles.reinit}>Réinitialiser</button>
        </form>
      )}

      {message && <p className={styles.reinitMsg}>{message}</p>}
    </main>
  )
}

export default Reset
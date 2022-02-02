import axios from 'axios'

import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'

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

  console.log('token: ', token)

  const getEmail = useCallback(async () => {
    if (token) {
      axios
        .get('/api/auth/reset', { params: { tokenToCheck: token } })
        .then(response => {
          console.log('response getEmail', response)
          setFormData({
            ...formData,
            email: response.data.email,
            message: response.data.message,
            displayForm: response.data.displayForm
          })
        })
        .catch(err => {
          setFormData({
            ...formData,
            message: err.response.data.message
          })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    getEmail()
  }, [getEmail])

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleFormSubmit = e => {
    e.preventDefault()

    axios
      .put('/api/auth/reset', { password, token })
      .then(response => {
        setFormData({
          ...formData,
          email: response.data.email,
          message: response.data.message,
          displayForm: response.data.displayForm
        })
      })
      .catch(err => {
        setFormData({ ...formData, message: err.response.data.message })
      })
  }

  return (
    <>
      <h1>Réinitialisation mot de passe</h1>

      {displayForm && (
        <form onSubmit={handleFormSubmit}>
          <p>
            Bonjour, vous avez demandé la réinitialisation du mot de passe
            associé à l'adresse E-mail: {email}
          </p>

          <label>
            Nouveau mot de passe:
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
            />
          </label>
          <button>Réinitialiser</button>
        </form>
      )}

      {message && <p className='message'>{message}</p>}
    </>
  )
}

export default Reset

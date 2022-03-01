import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import { getAuthReset , putAuthReset } from '../../apiCall/auth'

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

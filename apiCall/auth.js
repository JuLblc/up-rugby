import axios from 'axios'

export const putAuthForgot = async email => {
  try {
    return await axios.put('/api/auth/forgot', { email })
  } catch (err) {
    return err.response
  }
}

export const postAuth = async (email, password) => {
  try {
    return await axios.post('/api/auth', { email, password })
  } catch (err) {
    return err.response
  }
}

export const getAuthReset = async tokenToCheck => {
  try {
    return await axios.get('/api/auth/reset', { params: { tokenToCheck } })
  } catch (err) {
    return err.response
  }
}

export const putAuthReset = async (password, token) => {
  try {
    return await axios.put('/api/auth/reset', { password, token })
  } catch (err) {
    return err.response
  }
}

export const getAuthVerify = async tokenToCheck => {
  try {
    return await axios.get('/api/auth/verify', { params: { tokenToCheck } })
  } catch (err) {
    return err.response
  }
}

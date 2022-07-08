import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import { getAuthVerify } from '../../apiCall/auth'
import Head from 'next/head'

const Verify = () => {
  const [message, setMessage] = useState()
  const router = useRouter()
  const { token } = router.query

  const verifyToken = useCallback(async () => {
    if (token) {
      const resGetAuthVerify = await getAuthVerify(token)
      setMessage(resGetAuthVerify.data.message)
    }
  }, [token])

  useEffect(() => {
    verifyToken()
  }, [verifyToken]) // if changes, useEffect will run again
  // if you want to run only once, just leave array empty []

  return (
    <>
      <Head>
        <title>Vérification - UpRugby</title>
      </Head>
      <main>{message && <p className='message'>{message}</p>}</main>
    </>
  )
}

export default Verify

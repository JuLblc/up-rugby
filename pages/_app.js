import '../styles/globals.css'

import { SessionProvider } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Loading from '../components/Loading'
import Navbar from '../components/Navbar'

function MyApp ({ Component, pageProps }) {
  // console.log('myApp: ', pageProps)

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  //Spinner loading
  useEffect(() => {
    const handleStart = url => {
      url !== router.pathname ? setLoading(true) : setLoading(false)
    }
    const handleComplete = url => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  }, [router])

  return (
    <SessionProvider session={pageProps.session}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <Component {...pageProps} />
        </>
      )}
    </SessionProvider>
  )
}

export default MyApp

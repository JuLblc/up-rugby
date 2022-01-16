import '../styles/globals.css'

import { SessionProvider } from 'next-auth/react';

import Navbar from '../components/Navbar'

function MyApp ({ Component, pageProps }) {
  // console.log('myApp: ', pageProps)
  return (
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
  )
}

export default MyApp
import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Loading from "../components/Loading";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  // console.log('myApp: ', pageProps)

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //Spinner loading
  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <SessionProvider session={pageProps.session}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </>
        )}
      </SessionProvider>
    </>
  );
}

export default MyApp;

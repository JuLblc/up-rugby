import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useWindowDimensions } from '../hooks/useWindowDimensions'
import { getDeviceTypeInfo } from '../utils/utilResponsive'

import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  const { data: session, status } = useSession()

  const { width, height } = useWindowDimensions()

  const {
    isMobile,
    isTablet,
    isDesktopOrLaptop,
    isBigScreen
  } = getDeviceTypeInfo(width, height)

  const displayMenu = () => {
    console.log('display menu')
  }

  const handleSignOut = e => {
    e.preventDefault()
    signOut({
      callbackUrl: '/login'
    })
  }

  return (
    <nav className={styles.header}>
      <ul
        className={`${styles.headerNav} ${
          status === 'loading' ? styles.loading : styles.loaded
        } `}
      >
        <li>
          <Link href='/'>
            <a>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 1000 1000'
                enableBackground='new 0 0 1000 1000'
                width='24'
                height='24'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <g>
                  <g transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'>
                    <path d='M7005.7,5013.3c-1691.7-172.6-3275.9-995.4-4670.3-2428.2C1618.1,1846.8,1127.1,1160.1,732,343.1C417.4-309.1,241-884.5,137.4-1594.1c-49.9-329.9-49.9-1070.2,0-1359.9c42.2-262.7,92.1-422,184.1-606.1c257-506.4,761.4-947.5,1267.8-1110.5c184.1-59.5,469.9-97.8,822.8-111.2c1427-51.8,2967.1,498.7,4305.9,1540.1c517.9,400.9,1125.9,1005,1551.6,1534.4c769.1,960.9,1281.2,2002.4,1507.5,3068.8c95.9,454.6,122.8,717.3,122.8,1216c1.9,634.9-47.9,926.4-212.9,1254.4c-97.8,197.6-235.9,387.4-402.8,554.3c-352.9,354.8-667.5,521.7-1123.9,600.3C7949.4,5021,7253.1,5038.3,7005.7,5013.3z M7893.7,4706.5c99.7-9.6,184.1-21.1,189.9-26.9c21.1-19.2-32.6-226.3-97.8-389.4C7391.2,2834.5,4169-623.6,1923-2211.7c-621.4-441.1-1221.8-749.9-1415.5-730.7c-59.5,5.7-61.4,11.5-76.7,111.2c-28.8,201.4-21.1,876.5,15.3,1141.2C645.7-180.5,1386,1208.1,2671.1,2491.2c1185.3,1181.5,2545.2,1925.7,3941.5,2157.7C7053.7,4721.8,7523.6,4742.9,7893.7,4706.5z M9575.8,3053.2c7.7-67.1,13.4-272.3,13.4-456.5c-7.7-1973.6-1072.2-3970.2-2924.9-5489.3c-1240.9-1014.6-2723.6-1590-4098.8-1588.1c-207.1,0-573.5,28.8-590.7,46c-3.8,5.8,1.9,53.7,13.4,111.3c209,995.4,2543.2,3751.6,4873.6,5752C7932.1,2347.3,8916,3012.9,9393.6,3141.4C9562.4,3187.4,9560.5,3187.4,9575.8,3053.2z' />
                  </g>
                </g>
              </svg>
            </a>
          </Link>
        </li>
        {/* Display menu according to device */}
        {(isDesktopOrLaptop || isBigScreen) && (
          <>
            <li>
              <Link href='/courses'>
                <a>Formations</a>
              </Link>
            </li>
            <li>
              <Link href='/exercices'>
                <a>Exercices</a>
              </Link>
            </li>
            <li>
              <Link href='/blog'>
                <a>Blog</a>
              </Link>
            </li>
          </>
        )}
      </ul>
      <ul
        className={`${styles.headerSide} ${
          status === 'loading' ? styles.loading : styles.loaded
        }`}
      >
        {/* If user is logged in -> display profile button*/}
        {session && (
          <li>
            <Link href='/profile'>
              <a>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                >
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path d='M4 22a8 8 0 1 1 16 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z' />
                </svg>
              </a>
            </Link>
            {(isDesktopOrLaptop || isBigScreen) && session.user.firstName}
          </li>
        )}
        {/* If user is not logged in -> display login & sign up link*/}
        {status === 'unauthenticated' && !session && (
          /* Display link according to device */

          <>
            {isTablet || isMobile ? (
              <li>
                <Link href='/login'>
                  <a>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      width='24'
                      height='24'
                    >
                      <path fill='none' d='M0 0h24v24H0z' />
                      <path d='M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z' />
                    </svg>
                  </a>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link href='/signup'>
                    <a>S'inscrire</a>
                  </Link>
                </li>
                <li>
                  <Link href='/login'>
                    <a>Se connecter</a>
                  </Link>
                </li>
              </>
            )}
          </>
        )}

        {/* If user is logged in -> display logout button*/}
        {session && (
          <li>
            <Link href='/api/auth/signout'>
              <a onClick={handleSignOut}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  width='24'
                  height='24'
                >
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path d='M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z' />
                </svg>
              </a>
            </Link>
          </li>
        )}

        {/* Display burger button according to device */}
        {/* {console.log(isMobile, isTablet, isDesktopOrLaptop, isBigScreen)} */}
        {(isTablet || isMobile) && (
          <li>
            <button
              className={styles.burger}
              type='button'
              onClick={displayMenu}
            >
              ≡
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar

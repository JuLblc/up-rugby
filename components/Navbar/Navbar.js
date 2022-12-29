import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useScrollY } from "../../hooks/useScrollY";
import { getDeviceTypeInfo } from "../../utils/utilResponsive";

import Burger from "./Burger";

import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const { height, width } = useWindowDimensions();

  const goingUp = useScrollY();
  const scrollPositionY = useScrollPosition();

  const { isBigScreen, isDesktopOrLaptop, isMobile, isTablet } =
    getDeviceTypeInfo(width, height);

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut({
      callbackUrl: "/login?login=signin",
    });
  };

  return (
    <>
      {(goingUp || scrollPositionY < 150) && (
        <nav className={styles.navWrapper}>
          <div className={styles.header}>
            <ul
              className={`${styles.headerNav} ${
                status === "loading" ? styles.loading : styles.loaded
              } `}
            >
              <Link href="/">
                <span className={styles.imageWrapper}>
                  <Image src={logo} alt="logo" />
                </span>
              </Link>
              {/* Display menu according to device */}
              {(isDesktopOrLaptop || isBigScreen) && (
                <>
                  <li>
                    <Link href="/courses">
                      <a>Formations</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/exercices">
                      <a>Exercices</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/webinar">
                      <a>Webinar</a>
                    </Link>
                  </li>
                  {/* <li>
                    <Link href="#">
                      <a>Prestation</a>
                    </Link>
                  </li> */}
                  <li>
                    <Link href="/about">
                      <a>A propos</a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul
              className={`${styles.headerRightSide} ${
                status === "loading" ? styles.loading : styles.loaded
              }`}
            >
              {/* If user is logged in -> display profile button*/}
              {session && (
                <>
                  <li className={styles.liRightSide}>
                    <Link href="/profile?profile=cart">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          fill="#3a3a3a"
                          d="M4 6.414L.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414zM5.5 23a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li
                    className={styles.liRightSide}
                    onClick={() => router.push("/profile?profile=userInfo")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        fill="#3a3a3a"
                        d="M4 22a8 8 0 1 1 16 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z"
                      />
                    </svg>
                    {(isDesktopOrLaptop || isBigScreen) && (
                      <div className={styles.divRightSide}>
                        {session.user.firstName}
                      </div>
                    )}
                  </li>
                </>
              )}
              {/* If user is not logged in -> display login & sign up link*/}
              {status === "unauthenticated" && !session && (
                /* Display link according to device */

                <>
                  {isTablet || isMobile ? (
                    <li className={styles.liRightSide}>
                      <Link href="/login?login=signin">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            fill="#3a3a3a"
                            d="M10 11V8l5 4-5 4v-3H1v-2h9zm-7.542 4h2.124A8.003 8.003 0 0 0 20 12 8 8 0 0 0 4.582 9H2.458C3.732 4.943 7.522 2 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-4.478 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li className={`${styles.btnLogin} ${styles.btnSignIn}`}>
                        <Link href="/login?login=signin">
                          <a>Se connecter</a>
                        </Link>
                      </li>
                      <li className={`${styles.btnLogin} ${styles.btnSignUp}`}>
                        <Link href="/login?login=signup">
                          <a>S'inscrire</a>
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}

              {/* If user is logged in -> display logout button*/}
              {session && (
                <li className={styles.liRightSide}>
                  <Link href="/api/auth/signout">
                    <a onClick={handleSignOut}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          fill="#3a3a3a"
                          d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"
                        />
                      </svg>
                    </a>
                  </Link>
                </li>
              )}

              {/* Display burger button according to device */}
              {(isTablet || isMobile) && (
                <li className={styles.liRightSide}>
                  <Burger />
                </li>
              )}
            </ul>
          </div>
          <div className={styles.break}></div>
        </nav>
      )}
    </>
  );
};

export default Navbar;

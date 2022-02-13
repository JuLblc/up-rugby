import axios from 'axios'

import { useState } from 'react'
import { getSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import FormInput from '../components/FormInput'

import styles from '../styles/Login.module.css'

const Login = props => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    messageAPI: '',
    messageType: ''
  })
  const [loginOpt, setLoginOpt] = useState(props.loginOpt)
  const [reset, doReset] = useState(0)

  const [pattern, setPattern] = useState(props.patternStr)

  const { email, password, messageAPI, messageType } = formData

  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessages: {
        patternMismatch: null,
        valueMissing: 'Veuillez saisir votre adresse Email',
        valid: 'Merci de saisir une adresse valide'
      },
      required: true,
      reset: reset,
      svg: [
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
            d='M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439z'
            fill='rgba(103,104,121,1)'
          />
        </svg>
      ]
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessages: {
        patternMismatch:
          'Le mot de passe doit contenir au moins 6 caractères, un chiffre, une lettre et un caractère spécial',
        valueMissing: 'Veuillez saisir votre mot de passe',
        valid: null
      },
      pattern: pattern,
      required: true,
      reset: reset,
      svg: [
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
      ]
    }
  ]

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      messageAPI: '',
      messageType: ''
    })

  const onClick = () => {
    doReset(prev => prev + 1)

    if (loginOpt === 'signin') {
      setLoginOpt('signup')
      setPattern(
        `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`
      )
    }

    if (loginOpt === 'signup') {
      setLoginOpt('signin')
      setPattern(null)
    }

    setFormData({
      email: '',
      password: '',
      messageAPI: '',
      messageType: ''
    })
  }

  const handleFormSubmit = e => {
    e.preventDefault()

    /* --------------------------- SIGN IN ---------------------------*/
    if (loginOpt === 'signin') {
      signIn('credentials', {
        redirect: false,
        email,
        password
      })
        .then(response => {
          if (!response.error) {
            router.push('/')
          } else if (
            response.error === `Cannot read property 'password' of null`
          ) {
            setFormData({
              ...formData,
              messageAPI: 'Cette adresse E-mail est introuvable ou non validée',
              messageType: 'error'
            })
          } else {
            setFormData({
              ...formData,
              messageAPI:
                'Cette adresse E-mail et ce mot de passe ne correspondent pas',
              messageType: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err)
          setFormData({
            ...formData,
            messageAPI: err.response.data.message,
            messageType: 'error'
          })
        })
    } else {
      /* --------------------------- SIGN UP ---------------------------*/
      axios
        .post('/api/auth', { email, password })
        .then(response => {
          // console.log('response: ', response.data)
          setFormData({
            ...formData,
            messageAPI: response.data.message,
            messageType: response.data.messageType
          })
        })
        .catch(err =>
          setFormData({
            ...formData,
            messageAPI: err.response.data.message,
            messageType: err.response.data.messageType
          })
        )
    }
  }

  const logInFacebook = e => {
    e.preventDefault()

    signIn('facebook', { callbackUrl: process.env.DOMAIN_URL })
  }

  const logInGoogle = e => {
    e.preventDefault()

    signIn('google', { callbackUrl: process.env.DOMAIN_URL })
  }

  return (
    <main className={styles.authContainer}>
      {loginOpt === 'signin' ? <h1>Se connecter</h1> : <h1>S'inscrire</h1>}
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className={styles.socialMediaContainer}>
        {/* With Facebook */}
        <Link href='#'>
          <a
            onClick={logInFacebook}
            className={`${styles.btnSocial} ${styles.btnFacebook}`}
          >
            <svg
              className={styles.icon}
              width='25'
              height='24'
              viewBox='0 0 25 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_1_114)'>
                <rect
                  width='24'
                  height='24'
                  transform='translate(0.845947)'
                  fill='#1877F2'
                />
                <path
                  d='M24.3459 12.0699C24.3459 5.7186 19.1972 0.56988 12.8459 0.56988C6.49467 0.56988 1.34595 5.7186 1.34595 12.0699C1.34595 17.8099 5.55133 22.5674 11.0491 23.4302V15.3941H8.12915V12.0699H11.0491V9.53629C11.0491 6.6541 12.7659 5.06207 15.3928 5.06207C16.651 5.06207 17.967 5.28668 17.967 5.28668V8.11675H16.5169C15.0883 8.11675 14.6428 9.00322 14.6428 9.91266V12.0699H17.8323L17.3224 15.3941H14.6428V23.4302C20.1406 22.5674 24.3459 17.8099 24.3459 12.0699Z'
                  fill='white'
                />
              </g>
              <defs>
                <clipPath id='clip0_1_114'>
                  <rect
                    width='24'
                    height='24'
                    fill='white'
                    transform='translate(0.845947)'
                  />
                </clipPath>
              </defs>
            </svg>
            {loginOpt === 'signin' ? (
              <>Se connecter avec Facebook</>
            ) : (
              <>S'inscrire avec Facebook</>
            )}
          </a>
        </Link>

        {/* With Google */}
        <Link href='#'>
          <a
            onClick={logInGoogle}
            className={`${styles.btnSocial} ${styles.btnGoogle}`}
          >
            <svg
              className={styles.icon}
              width='25'
              height='24'
              viewBox='0 0 25 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='24'
                height='24'
                transform='translate(0.845947)'
                fill='white'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M23.8859 12.2614C23.8859 11.4459 23.8128 10.6618 23.6769 9.90912H12.8459V14.3575H19.035C18.7684 15.795 17.9582 17.013 16.7403 17.8284V20.7139H20.4569C22.6314 18.7118 23.8859 15.7637 23.8859 12.2614Z'
                fill='#4285F4'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.8459 23.4998C15.9509 23.4998 18.5541 22.47 20.4568 20.7137L16.7402 17.8282C15.7105 18.5182 14.3932 18.9259 12.8459 18.9259C9.85068 18.9259 7.31546 16.903 6.41114 14.1848H2.56909V17.1644C4.46136 20.9228 8.35046 23.4998 12.8459 23.4998Z'
                fill='#34A853'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6.41117 14.1851C6.18117 13.4951 6.05049 12.758 6.05049 12.0001C6.05049 11.2421 6.18117 10.5051 6.41117 9.81506V6.83551H2.56913C1.79027 8.38801 1.34595 10.1444 1.34595 12.0001C1.34595 13.8557 1.79027 15.6121 2.56913 17.1646L6.41117 14.1851Z'
                fill='#FBBC05'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M12.8459 5.07386C14.5343 5.07386 16.0502 5.65409 17.242 6.79364L20.5405 3.49523C18.5489 1.63955 15.9457 0.5 12.8459 0.5C8.35046 0.5 4.46136 3.07705 2.56909 6.83545L6.41114 9.815C7.31546 7.09682 9.85068 5.07386 12.8459 5.07386Z'
                fill='#EA4335'
              />
            </svg>
            {loginOpt === 'signin' ? (
              <>Se connecter avec Google</>
            ) : (
              <>S'inscrire avec Google</>
            )}
          </a>
        </Link>

        {/* With Linkedin */}
        <Link href='#'>
          <a className={`${styles.btnSocial} ${styles.btnLinkedin}`}>
            <svg
              className={styles.icon}
              height='2500'
              width='2490'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 256 256'
            >
              <g fill='none'>
                <path
                  d='M0 18.338C0 8.216 8.474 0 18.92 0h218.16C247.53 0 256 8.216 256 18.338v219.327C256 247.79 247.53 256 237.08 256H18.92C8.475 256 0 247.791 0 237.668V18.335z'
                  fill='#069'
                />
                <path
                  d='M77.796 214.238V98.986H39.488v115.252H77.8zM58.65 83.253c13.356 0 21.671-8.85 21.671-19.91-.25-11.312-8.315-19.915-21.417-19.915-13.111 0-21.674 8.603-21.674 19.914 0 11.06 8.312 19.91 21.169 19.91h.248zM99 214.238h38.305v-64.355c0-3.44.25-6.889 1.262-9.346 2.768-6.885 9.071-14.012 19.656-14.012 13.858 0 19.405 10.568 19.405 26.063v61.65h38.304v-66.082c0-35.399-18.896-51.872-44.099-51.872-20.663 0-29.738 11.549-34.78 19.415h.255V98.99H99.002c.5 10.812-.003 115.252-.003 115.252z'
                  fill='#fff'
                />
              </g>
            </svg>
            {loginOpt === 'signin' ? (
              <>Se connecter avec Linkedin</>
            ) : (
              <>S'inscrire avec Linkedin</>
            )}
          </a>
        </Link>
      </div>

      <div className={styles.break}>
        <span>ou</span>
      </div>

      {/* Login with Credentials */}
      <form onSubmit={handleFormSubmit}>
        {inputs.map(input => (
          <FormInput
            key={input.id}
            {...input}
            value={formData[input.name]}
            onChange={onChange}
          />
        ))}

        {messageAPI && (
          <div
            className={`${styles.message} ${styles.messageAPI} ${messageType ===
              'error' && styles.onError}  ${messageType === 'success' &&
              styles.onSuccessServer}`}
          >
            <svg
              className={styles.icon}
              width='20'
              height='21'
              viewBox='0 0 20 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10 2.60596C9.661 2.60596 9.32868 2.70028 9.04023 2.87836C8.75177 3.05645 8.51855 3.31128 8.36665 3.61435L8.36633 3.61498L2.44277 15.4621L2.44269 15.4623C2.30353 15.7407 2.23784 16.0502 2.25185 16.3612C2.26586 16.6721 2.3591 16.9744 2.52272 17.2392C2.68635 17.5041 2.91493 17.7227 3.18678 17.8744C3.45863 18.0261 3.76473 18.1058 4.07604 18.106H4.07644H15.9236H15.924C16.2353 18.1058 16.5414 18.0261 16.8132 17.8744C17.0851 17.7227 17.3137 17.5041 17.4773 17.2392C17.6409 16.9744 17.7341 16.6721 17.7481 16.3612C17.7622 16.0502 17.6965 15.7407 17.5573 15.4623L17.5572 15.4621L11.6337 3.61498L11.6333 3.61435C11.4815 3.31128 11.2482 3.05645 10.9598 2.87836C10.6713 2.70028 10.339 2.60596 10 2.60596ZM9.82821 4.15471C9.87984 4.12284 9.93932 4.10596 10 4.10596C10.0607 4.10596 10.1202 4.12284 10.1718 4.15471C10.2233 4.18654 10.265 4.23207 10.2922 4.28622L10.2923 4.28645L16.2155 16.1328L16.2156 16.1329C16.2404 16.1827 16.2522 16.2381 16.2497 16.2937C16.2472 16.3493 16.2305 16.4034 16.2012 16.4508C16.1719 16.4982 16.131 16.5374 16.0823 16.5645C16.0337 16.5917 15.9789 16.6059 15.9232 16.606H4.07684C4.02112 16.6059 3.96633 16.5917 3.91767 16.5645C3.86901 16.5374 3.8281 16.4982 3.79881 16.4508C3.76953 16.4034 3.75284 16.3493 3.75033 16.2937C3.74783 16.2381 3.75956 16.1827 3.78441 16.1329L3.78449 16.1328L9.70765 4.28645L9.70777 4.2862C9.73496 4.23206 9.77666 4.18654 9.82821 4.15471ZM10 7.45135C10.4142 7.45135 10.75 7.78714 10.75 8.20135V11.4324C10.75 11.8466 10.4142 12.1824 10 12.1824C9.58579 12.1824 9.25 11.8466 9.25 11.4324V8.20135C9.25 7.78714 9.58579 7.45135 10 7.45135ZM9.2303 13.8937C9.43444 13.6896 9.7113 13.5749 9.99999 13.5749C10.2887 13.5749 10.5655 13.6896 10.7697 13.8937C10.9738 14.0979 11.0885 14.3747 11.0885 14.6634C11.0885 14.9521 10.9738 15.229 10.7697 15.4331C10.5655 15.6372 10.2887 15.7519 9.99999 15.7519C9.7113 15.7519 9.43444 15.6372 9.2303 15.4331C9.02617 15.229 8.91149 14.9521 8.91149 14.6634C8.91149 14.3747 9.02617 14.0979 9.2303 13.8937ZM9.99999 14.6749C10.003 14.6749 10.006 14.6737 10.0081 14.6715C10.0103 14.6694 10.0115 14.6665 10.0115 14.6634C10.0115 14.6604 10.0103 14.6574 10.0081 14.6553C10.006 14.6531 10.003 14.6519 9.99999 14.6519C9.99695 14.6519 9.99402 14.6531 9.99187 14.6553C9.98971 14.6574 9.9885 14.6604 9.9885 14.6634C9.9885 14.6665 9.98971 14.6694 9.99187 14.6715C9.99402 14.6737 9.99695 14.6749 9.99999 14.6749Z'
                fill={messageType === 'error' ? '#E44258' : '#00CA72'}
              />
            </svg>

            <span>{messageAPI}</span>
          </div>
        )}

        {loginOpt === 'signin' ? (
          <>
            <Link href='/forgotten-password'>
              <a className={styles.forgotten}>Mot de passe oublié?</a>
            </Link>
            <button>Se connecter</button>

            <div className={styles.register}>
              <span>Pas encore de compte?</span>
              <a onClick={onClick}>Inscrivez-vous</a>
            </div>
          </>
        ) : (
          <>
            <button>S'inscrire</button>
            <div className={styles.register}>
              <span>Déjà inscrit?</span>
              <a onClick={onClick}>Connectez-vous</a>
            </div>
          </>
        )}
      </form>
    </main>
  )
}

export default Login

//Server side rendering
export const getServerSideProps = async context => {
  const session = await getSession(context)

  //User is already logged in -> redirect vers home
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const loginOpt = context.query.login
  let patternStr
  loginOpt === 'signin'
    ? (patternStr = null)
    : (patternStr = `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`);

  return {
    props: {
      session,
      loginOpt,
      patternStr
    }
  }
}

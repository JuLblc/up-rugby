import Link from 'next/link'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <>
      <div className={styles.break}></div>
      <footer className={styles.footer}>
        <div>
          <h5>Philosophie</h5>
          <p>
            <i>
              "A force de vadrouiller dans le rugby, je suis passé par de
              nombreux clubs (à cause de ma grande bouche !) et de nombreux
              postes ! Passionné par le rugby depuis un peu plus de 15 ans
              maintenant j'aime partager mes compétences et mes analyses!
              Mon contenu s'adresse à tous les amoureux de ce magnifique sport.
              "
            </i>
          </p>
        </div>
        <div>
          <div className={styles.footerContact}>
            <h5>Contactez-moi</h5>
            {/* Gmail */}
            <div>
              <svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
                <g>
                  <polygon
                    points='484.973,122.808 452.288,451.017 59.712,451.017 33.379,129.16 256,253.802  '
                    fill='#F2F2F2'
                  />
                  <polygon
                    points='473.886,60.983 256,265.659 38.114,60.983 256,60.983  '
                    fill='#F2F2F2'
                  />
                </g>
                <path
                  d='M59.712,155.493v295.524H24.139C10.812,451.017,0,440.206,0,426.878V111.967l39,1.063L59.712,155.493  z'
                  fill='#F14336'
                />
                <path
                  d='M512,111.967v314.912c0,13.327-10.812,24.139-24.152,24.139h-35.56V155.493l19.692-46.525  L512,111.967z'
                  fill='#D32E2A'
                />
                <path
                  d='M512,85.122v26.845l-59.712,43.526L256,298.561L59.712,155.493L0,111.967V85.122  c0-13.327,10.812-24.139,24.139-24.139h13.975L256,219.792L473.886,60.983h13.962C501.188,60.983,512,71.794,512,85.122z'
                  fill='#F14336'
                />
                <polygon
                  points='59.712,155.493 0,146.235 0,111.967 '
                  fill='#D32E2A'
                />
              </svg>
              <span>uprugbyfr@gmail.com</span>
            </div>
            {/* Whatsapp */}
            <div>
              <svg
                width='48'
                height='48'
                viewBox='0 0 48 48'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z'
                  fill='#25D366'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M24.7911 37.3526H24.7852C22.3967 37.3517 20.0498 36.7525 17.9653 35.6155L10.4 37.6L12.4246 30.2049C11.1757 28.0406 10.5186 25.5855 10.5196 23.0703C10.5228 15.2017 16.9248 8.80005 24.7909 8.80005C28.6086 8.8017 32.1918 10.2879 34.8862 12.9855C37.5806 15.6829 39.0636 19.2684 39.0621 23.0816C39.059 30.9483 32.6595 37.3494 24.7911 37.3526ZM18.3159 33.0319L18.749 33.289C20.5702 34.3697 22.6578 34.9416 24.7863 34.9424H24.7911C31.3288 34.9424 36.6499 29.6212 36.6525 23.0807C36.6538 19.9113 35.4212 16.9311 33.1817 14.689C30.9422 12.4469 27.964 11.2116 24.7957 11.2105C18.2529 11.2105 12.9318 16.5312 12.9292 23.0711C12.9283 25.3124 13.5554 27.4952 14.7427 29.3837L15.0248 29.8325L13.8265 34.2096L18.3159 33.0319ZM31.4924 26.1541C31.7411 26.2743 31.9091 26.3555 31.9808 26.4752C32.0699 26.6239 32.0699 27.3378 31.7729 28.1709C31.4756 29.0038 30.051 29.764 29.3659 29.8664C28.7516 29.9582 27.9741 29.9965 27.1199 29.7251C26.602 29.5608 25.9379 29.3414 25.0871 28.9739C21.7442 27.5305 19.485 24.2904 19.058 23.6781C19.0281 23.6352 19.0072 23.6052 18.9955 23.5896L18.9927 23.5858C18.804 23.334 17.5395 21.6469 17.5395 19.9008C17.5395 18.2583 18.3463 17.3974 18.7177 17.0011C18.7432 16.9739 18.7666 16.9489 18.7875 16.9261C19.1144 16.5691 19.5007 16.4798 19.7384 16.4798C19.9761 16.4798 20.2141 16.482 20.4219 16.4924C20.4475 16.4937 20.4742 16.4936 20.5017 16.4934C20.7095 16.4922 20.9686 16.4907 21.2242 17.1046C21.3225 17.3408 21.4664 17.6911 21.6181 18.0605C21.9249 18.8075 22.264 19.6328 22.3236 19.7523C22.4128 19.9308 22.4722 20.1389 22.3533 20.377C22.3355 20.4127 22.319 20.4464 22.3032 20.4786C22.2139 20.6608 22.1483 20.7949 21.9967 20.9718C21.9372 21.0414 21.8756 21.1164 21.814 21.1914C21.6913 21.3408 21.5687 21.4902 21.4619 21.5966C21.2833 21.7744 21.0975 21.9673 21.3055 22.3243C21.5135 22.6813 22.2292 23.849 23.2892 24.7945C24.4288 25.8109 25.4192 26.2405 25.9212 26.4583C26.0192 26.5008 26.0986 26.5353 26.1569 26.5644C26.5133 26.743 26.7213 26.7131 26.9294 26.4752C27.1374 26.2372 27.8208 25.4339 28.0584 25.077C28.2961 24.7201 28.5339 24.7796 28.8607 24.8985C29.1877 25.0176 30.9408 25.8802 31.2974 26.0586C31.367 26.0935 31.4321 26.125 31.4924 26.1541Z'
                  fill='#FDFDFD'
                />
              </svg>
              <span>+33 (0)6 50 07 84 96</span>
            </div>
          </div>
          <div className={styles.footerSocial}>
            <h5>Suivez-moi</h5>
            {/* Facebook */}
            <a href='https://www.facebook.com/uprugby' target='_blank' rel="noreferrer">
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <rect width='512' height='512' rx='15%' fill='#1877f2' />
                <path
                  d='M355.6 330l11.4-74h-71v-48c0-20.2 9.9-40 41.7-40H370v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6V256h-65v74h65v182h80V330h59.6z'
                  fill='#fff'
                />
              </svg>
            </a>
            {/* Youtube */}
            <a href='https://www.youtube.com/c/uprugby' target='_blank' rel="noreferrer">
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <title>youtube-flat</title>
                <g id='YouTube'>
                  <circle id='back' cx='256' cy='256' r='256' fill='#e52d27' />
                  <path
                    id='youtube-2'
                    data-name='youtube'
                    d='M399.36,313.34a41.09,41.09,0,0,1-41,41H153.6a41.08,41.08,0,0,1-41-41V198.66a41.08,41.08,0,0,1,41-41H358.4a41.08,41.08,0,0,1,41,41Zm-173-22.17L303.86,251l-77.47-40.42Z'
                    fill='#fff'
                  />
                </g>
              </svg>
            </a>
            {/* Linkedin */}
            <svg
              viewBox='0 0 72 72'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <title>Linkedin</title>
              <g
                id='Page-1'
                stroke='none'
                strokeWidth='1'
                fill='none'
                fillRule='evenodd'
              >
                <g
                  id='Social-Icons---Rounded'
                  transform='translate(-376.000000, -267.000000)'
                >
                  <g
                    id='Linkedin'
                    transform='translate(376.000000, 267.000000)'
                  >
                    <path
                      d='M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z'
                      id='Rounded'
                      fill='#007EBB'
                    ></path>
                    <path
                      d='M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z'
                      fill='#FFFFFF'
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div>
          <h5>Menu</h5>
          <ul>
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
            <li>
              <Link href='#'>
                <a>Prestation</a>
              </Link>
            </li>
            <li>
              <Link href='#'>
                <a>A propos</a>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default Footer

import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <main className={styles.home}>
      <section className={styles.intro}>
        <div className={styles.body}>
          <h1>
            <strong>Améliorez</strong> votre compréhension du rugby
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            nisl vulputate, iaculis tortor quis, convallis ipsum. Duis consequat
            fringilla condimentum.
          </p>
          <div className={styles.link}>
            <Link href="/login?login=signup">
              <a>Créez votre compte</a>
            </Link>
            <Link href="/courses">
              <a>Voir les formations</a>
            </Link>
          </div>
        </div>
        <div className={styles.illustration}>Image</div>
      </section>
      <section className={styles.support}>
        <div className={styles.body}>
          <h1>
            <strong>Plusieurs formats</strong> adaptés à vos besoins et à votre
            budget
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            nisl vulputate, iaculis tortor quis, convallis ipsum. Duis consequat
            fringilla condimentum.
          </p>
        </div>
        <div className={styles.supportItemsContainer}>
          <Link href="/courses">
            <div className={styles.supportItemsContent}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="48"
                height="48"
              >
                <g id="Graduation">
                  <polygon points="445.055 384.794 445.055 221.864 418.805 234.989 418.805 384.777 401.301 429.785 462.551 429.785 445.055 384.794" />
                  <path d="M229.0648,306.3708l-107.7643-53.88v53.7754c0,36.2433,58.7634,65.625,131.25,65.625,72.4887,0,131.25-29.3817,131.25-65.625V252.49L276.0277,306.3741C257.5813,313.681,247.5133,313.6789,229.0648,306.3708Z" />
                  <path d="M264.2912,282.8969l186.5207-93.26c6.4579-3.2289,6.4579-8.5107,0-11.74l-186.5207-93.26c-6.4556-3.2289-17.0214-3.2289-23.4793,0l-186.5207,93.26c-6.4556,3.2289-6.4556,8.5107,0,11.74l186.5207,93.26C247.27,286.1258,257.8356,286.1258,264.2912,282.8969Z" />
                </g>
              </svg>
              <div>
                <a>Des formations uniques et innovantes</a>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </Link>
          <div className={styles.break}></div>
          <Link href="/exercices">
            <div className={styles.supportItemsContent}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="48"
                height="48"
              >
                <g id="Graduation">
                  <polygon points="445.055 384.794 445.055 221.864 418.805 234.989 418.805 384.777 401.301 429.785 462.551 429.785 445.055 384.794" />
                  <path d="M229.0648,306.3708l-107.7643-53.88v53.7754c0,36.2433,58.7634,65.625,131.25,65.625,72.4887,0,131.25-29.3817,131.25-65.625V252.49L276.0277,306.3741C257.5813,313.681,247.5133,313.6789,229.0648,306.3708Z" />
                  <path d="M264.2912,282.8969l186.5207-93.26c6.4579-3.2289,6.4579-8.5107,0-11.74l-186.5207-93.26c-6.4556-3.2289-17.0214-3.2289-23.4793,0l-186.5207,93.26c-6.4556,3.2289-6.4556,8.5107,0,11.74l186.5207,93.26C247.27,286.1258,257.8356,286.1258,264.2912,282.8969Z" />
                </g>
              </svg>
              <div>
                <a>Une banque d'exercices</a>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </Link>
          <div className={styles.break}></div>
          <Link href="#">
            <div className={styles.supportItemsContent}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="48"
                height="48"
              >
                <path
                  d="M28.9,25.2c1.8-1,3.1-3,3.1-5.2c0-3.3-2.7-6-6-6s-6,2.7-6,6c0,2.3,1.3,4.2,3.1,5.2l-1.5,1.2c-0.7,0.5-0.9,1.4-0.6,2.2
	s1,1.3,1.9,1.3h6.3c0.9,0,1.6-0.5,1.9-1.3s0-1.7-0.6-2.2L28.9,25.2z M26,18c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S24.9,18,26,18z"
                />
                <path
                  d="M18,20c0-0.7,0.1-1.4,0.3-2H5V7h17v6.1c0.6-0.4,1.3-0.6,2-0.8V6c0-0.6-0.4-1-1-1H4C3.4,5,3,5.4,3,6v12
	c-0.4,0-0.8,0.2-0.9,0.6l-2,5c-0.1,0.3-0.1,0.7,0.1,0.9S0.7,25,1,25h18.8C18.6,23.6,18,21.8,18,20z"
                />
              </svg>
              <div>
                <a>Webinar</a>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;

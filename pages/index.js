import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import img from "../public/768-Ruck.jpg";
import testiPict1 from "../public/testi-1.jpg";
import testiPict2 from "../public/testi-2.jpg";
import testiPict3 from "../public/testi-3.jpg";
import testiPict4 from "../public/testi-4.jpg";
import testiPict5 from "../public/testi-5.jpg";

import { useWindowDimensions } from "../hooks/useWindowDimensions";
import {getElementProperties} from "../utils/utilTestimonial"
import CardTestimonial from "../components/CardTestimonial";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  const { width } = useWindowDimensions();

  const testimonials = [
    {
      id: 0,
      img: testiPict1,
      content: `"Nous avions quelques idées sur les systèmes de jeu et notamment le
      système 1 3 3 1 mais de façon assez globale et empirique… Le détails et
      la finesse de l’analyse nous ont permis de gagner en précision et en
      connaissance. De superbes outils (analyse vidéo, powerpoint…) tant
      pour les éducateurs que pour les joueurs. Je recommande vivement !
      Bravo Charles !"`,
      name: "Adrien Renault",
      jobs: ["RESPONSABLE SPORTIF COB79"]
    },
    {
      id: 1,
      img: testiPict4,
      content: `"Contenu pertinent et efficace. Travaillant dans un comité Départemental de rugby, et étant entraîneur en fédérale 1, les formations de Charles m’ont permis de continuer à progresser dans le métier et l’analyse du jeu. Merci encore Charles et je recommande fortement à tous entraîneurs (Pro – Fédéral – Série) les formations Up Rugby"`,
      name: "Valentin Caillaux",
      jobs: ["ENTRAÎNEUR ESPOIR", "ENTRAÎNEUR F1", "AGENT DE DÉVELOPPEMENT FFR"]
    },
    {
      id: 2,
      img: testiPict3,
      content: `"Cette formation est ultra-complète et intéressante. Charles propose toutes les variantes de ce système offensif, chacun peut s’y reconnaître et se l’approprier. Le travail de compilation des vidéos est formidable et permet de bien comprendre la finalité de ce système. Et que dire des différents Powerpoint mis à disposition pour que chacun d’entre nous puisse les intégrer à son projet de jeu."`,
      name: "Jean Marc Laboret",
      jobs: ["ENTRAINEUR HONNEUR"]
    },
    {
      id: 3,
      img: testiPict2,
      content: `"Très bonne formation. Facilement expliquée avec des illustrations sur des vidéos. Formateur disponible pour des explications et des approfondissements. Merci à toi. Je reviens pour d’autres formations."`,
      name: "Bakary Soumahoro",
      jobs: ["DTN ADJOINT CÔTE D'IVOIRE"]
    },
    {
      id: 4,
      img: testiPict5,
      content: `"Voilà un expert qui met à notre disposition des connaissances et des savoirs indispensables à notre quotidien de coach pour optimiser le potentiel de nos équipes, augmenter notre pouvoir de transformation. En plus elles sont évolutives ! Bravo pour cet immense travail et cet apport à notre rugby"`,
      name: "Serge Collinet",
      jobs: ["RESP. SPORTIF STADE FRANÇAIS", "CHAMPION DE FRANCE FED. 2"]
    }
  ];

  const [offset, setOffset] = useState(0);
  const [display, setDisplay] = useState({ items: 3, width: -33.3333 });
  const sliderRef = useRef();

  useEffect(() => {
    if (width > 1420) {
      setDisplay({ items: 3, width: -33.3333 });
      sliderRef.current.style.left = offset * display.width + "%";
      return;
    }

    const { cardMarginLeftNum, sliderWidthNum} = getElementProperties(sliderRef.current)

    if (width > 1060 && width <= 1420) {
      const width = (-100 * (1 - cardMarginLeftNum / sliderWidthNum)) / 2;

      setDisplay({
        items: 2,
        width
      });
      sliderRef.current.style.left = offset * display.width + "%";
      return;
    }

    if (width <= 1060) {
      const width = -100 * (1 - cardMarginLeftNum / sliderWidthNum);
      setDisplay({ items: 1, width });
      sliderRef.current.style.left = offset * display.width + "%";
      return;
    }

    if (width <= 720) {
      setDisplay({ items: 1, width: -100 });
    }
  }, [width]);

  const clickIncrease = () => {
    if (offset < testimonials.length - display.items) {
      sliderRef.current.style.left = (offset + 1) * display.width + "%";
      setOffset(offset + 1);
    }
  };

  const clickDecrease = () => {
    if (offset > 0) {
      sliderRef.current.style.left = (offset - 1) * display.width + "%";
      setOffset(offset - 1);
    }
  };

  return (
    <main className={styles.home}>
      <section className={styles.intro}>
        <div className={styles.body}>
          <h1>
            <span>Améliorez</span> votre compréhension
            <br />
            du rugby
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
        {width >= 1100 && (
          <div className={styles.illustration}>
            <Image src={img} alt="img" />
          </div>
        )}
      </section>
      <section className={styles.support}>
        <div className={styles.body}>
          <h1>
            <span>Plusieurs formats</span> adaptés à vos besoins et à votre
            budget
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            nisl vulputate, iaculis tortor quis, convallis ipsum. Duis consequat
            fringilla condimentum.
          </p>
        </div>
        <div className={styles.supportWrapper}>
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
                    <polygon
                      fill="#3a3a3a"
                      points="445.055 384.794 445.055 221.864 418.805 234.989 418.805 384.777 401.301 429.785 462.551 429.785 445.055 384.794"
                    />
                    <path
                      fill="#3a3a3a"
                      d="M229.0648,306.3708l-107.7643-53.88v53.7754c0,36.2433,58.7634,65.625,131.25,65.625,72.4887,0,131.25-29.3817,131.25-65.625V252.49L276.0277,306.3741C257.5813,313.681,247.5133,313.6789,229.0648,306.3708Z"
                    />
                    <path
                      fill="#3a3a3a"
                      d="M264.2912,282.8969l186.5207-93.26c6.4579-3.2289,6.4579-8.5107,0-11.74l-186.5207-93.26c-6.4556-3.2289-17.0214-3.2289-23.4793,0l-186.5207,93.26c-6.4556,3.2289-6.4556,8.5107,0,11.74l186.5207,93.26C247.27,286.1258,257.8356,286.1258,264.2912,282.8969Z"
                    />
                  </g>
                </svg>
                <div>
                  <a>Formations uniques et innovantes</a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </Link>
            <div className={styles.break}></div>
            <Link href="/exercices">
              <div className={styles.supportItemsContent}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 53V57V61H49V57V53H9Z" fill="#3a3a3a" />
                  <path d="M9 57V61H3V53H9V57Z" fill="#3a3a3a" />
                  <path d="M9 3H3V53H9V3Z" fill="#3a3a3a" />
                  <path d="M61 19H55V50H61V19Z" fill="#3a3a3a" />
                  <path d="M61 10H55V16H61V10Z" fill="#3a3a3a" />
                  <path
                    d="M61 9H55C54.7348 9 54.4804 9.10536 54.2929 9.29289C54.1054 9.48043 54 9.73478 54 10V51C53.9997 51.1355 54.0273 51.2696 54.081 51.394L57.081 58.394C57.1581 58.5738 57.2863 58.727 57.4497 58.8347C57.613 58.9424 57.8044 58.9997 58 58.9997C58.1956 58.9997 58.387 58.9424 58.5503 58.8347C58.7137 58.727 58.8419 58.5738 58.919 58.394L61.919 51.394C61.9727 51.2696 62.0003 51.1355 62 51V10C62 9.73478 61.8946 9.48043 61.7071 9.29289C61.5196 9.10536 61.2652 9 61 9ZM60 11V15H56V11H60ZM56 49V20H60V49H56ZM56 18V17H60V18H56ZM58 55.461L56.088 51H59.912L58 55.461Z"
                    fill="#3a3a3a"
                  />
                  <path
                    d="M49 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V61C2 61.2652 2.10536 61.5196 2.29289 61.7071C2.48043 61.8946 2.73478 62 3 62H49C49.2652 62 49.5196 61.8946 49.7071 61.7071C49.8946 61.5196 50 61.2652 50 61V3C50 2.73478 49.8946 2.48043 49.7071 2.29289C49.5196 2.10536 49.2652 2 49 2V2ZM48 52H10V4H48V52ZM4 4H8V52H4V4ZM4 54H8V60H4V54ZM10 60V54H48V56H12V58H48V60H10Z"
                    fill="#3a3a3a"
                  />
                  <path d="M44 9H14V11H44V9Z" fill="#71888E" />
                  <path d="M44 15H14V17H44V15Z" fill="#71888E" />
                  <path d="M44 21H14V23H44V21Z" fill="#71888E" />
                  <path d="M44 27H14V29H44V27Z" fill="#71888E" />
                  <path d="M44 33H14V35H44V33Z" fill="#71888E" />
                  <path d="M44 39H14V41H44V39Z" fill="#71888E" />
                  <path d="M44 45H14V47H44V45Z" fill="#71888E" />
                </svg>
                <div>
                  <a>Une banque d'exercices</a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
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
                    fill="#3a3a3a"
                    d="M28.9,25.2c1.8-1,3.1-3,3.1-5.2c0-3.3-2.7-6-6-6s-6,2.7-6,6c0,2.3,1.3,4.2,3.1,5.2l-1.5,1.2c-0.7,0.5-0.9,1.4-0.6,2.2
	s1,1.3,1.9,1.3h6.3c0.9,0,1.6-0.5,1.9-1.3s0-1.7-0.6-2.2L28.9,25.2z M26,18c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S24.9,18,26,18z"
                  />
                  <path
                    fill="#3a3a3a"
                    d="M18,20c0-0.7,0.1-1.4,0.3-2H5V7h17v6.1c0.6-0.4,1.3-0.6,2-0.8V6c0-0.6-0.4-1-1-1H4C3.4,5,3,5.4,3,6v12
	c-0.4,0-0.8,0.2-0.9,0.6l-2,5c-0.1,0.3-0.1,0.7,0.1,0.9S0.7,25,1,25h18.8C18.6,23.6,18,21.8,18,20z"
                  />
                </svg>
                <div>
                  <a>Webinar</a>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.testiContainer}>
        <div className={`${styles.body} ${styles.bodyTestimonial}`}>
          <h1>
            <span>Témoignages</span> d'entraineurs
          </h1>
          <p>Consultez les témoignages les plus marquants.</p>
          <div className={styles.bodyComment}>
            Certains entraîneurs ont préféré garder l'anonymat (notamment Fed. 2
            et au dessus), je travail à révéler leur identité!
          </div>

          {/* Displaying button above testimonial container*/}
          {width > 720 && (
            <div className={styles.btnContainer}>
              <button
                className={offset === 0 ? styles.btnDisabled : undefined}
                type="button"
                onClick={clickDecrease}
                disabled={offset === 0 ? true : false}
              >
                {"<"}
              </button>
              <button
                className={
                  offset === testimonials.length - display.items
                    ? styles.btnDisabled
                    : undefined
                }
                type="button"
                onClick={clickIncrease}
                disabled={
                  offset === testimonials.length - display.items ? true : false
                }
              >
                {">"}
              </button>
            </div>
          )}
        </div>
        <div className={styles.sliderContainer}>
          <div ref={sliderRef} className={styles.slider}>
            {testimonials.map((testimonial) => (
              <CardTestimonial
                key={testimonial.id}
                img={testimonial.img}
                content={testimonial.content}
                name={testimonial.name}
                jobs={testimonial.jobs}
              />
            ))}
          </div>
        </div>
        {/* Displaying button below testimonial container */}
        {width <= 720 && (
          <div className={styles.btnContainer}>
            <button
              className={offset === 0 ? styles.btnDisabled : undefined}
              type="button"
              onClick={clickDecrease}
              disabled={offset === 0 ? true : false}
            >
              {"<"}
            </button>
            <button
              className={
                offset === testimonials.length - display.items
                  ? styles.btnDisabled
                  : undefined
              }
              type="button"
              onClick={clickIncrease}
              disabled={
                offset === testimonials.length - display.items ? true : false
              }
            >
              {">"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;

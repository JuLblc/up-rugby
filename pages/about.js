import styles from "../styles/About.module.css";
import Image from "next/image";
import imgPortrait from "../public/Charles.PNG";
import imgPaysage from "../public/charles_paysage.png";
import Head from "next/head";

import { useWindowDimensions } from "../hooks/useWindowDimensions";

const About = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      <Head>
        <title>A propos - UpRugby</title>
      </Head>
      <main className={styles.main}>
        <h1>
          Charles <span>Jouan</span>
        </h1>
        <section>
          <article>
            <h2>A propros de moi</h2>

            <p>
              En commençant par la préparation physique et en entraînant sur
              toutes les catégories, de l'analyse vidéo avec les pros au
              management de club avec 700 licenciés j'ai découvert cette passion
              qui peut être dure pour les entraîneurs.
            </p>

            <p>
              Le rugby est un sport complexe, et je crois que c'est difficile
              d'être un expert dans tous les domaines du rugby. Il y a des
              spécialistes des secteurs de jeu et du jeu au poste.
            </p>

            <p>
              La transmission des compétences se fait de façon empirique et il
              faut trouver quelqu'un qui accepte de partager son projet de jeu !
              Au rugby ce n'est pas évident de donner ses astuces au village d'à
              côté ! Je crée des formations sur des domaines de jeu spécifiques
              en apportant une analyse sur du rugby professionnel ! Les premiers
              retours (entraîneurs allant de U14 jusqu'à la National Senior) ont
              été merveilleux et je vais continuer à produire ces formations !
            </p>

            <p>
              Si vous vous demandez pourquoi les formations sont payantes, c'est
              parce que j'y consacre du temps, de l'énergie et de l'argent. Il
              s'agit juste d'équilibrer le budget du site tout en proposant un
              contenu de haute qualité
            </p>
          </article>
          <div className={styles.imgWrapper}>
            <Image
              src={width < 815 ? imgPaysage : imgPortrait}
              alt={"charles"}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default About;

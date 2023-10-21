import Head from "next/head";
import styles from "../styles/Coaching.module.css";
import Image from "next/image";
import Link from "next/link";

import img1 from "../public/coaching-1.webp";
import img2 from "../public/coaching-2.jpg";
import img2Paysage from "../public/coaching-2-paysage.jpg";

import { useWindowDimensions } from "../hooks/useWindowDimensions";

const Coaching = () => {
  const { width } = useWindowDimensions();

  return (
    <>
      <Head>
        <title>Accompagnement personnalisé - UpRugby</title>
      </Head>
      <main className={styles.main}>
        <h1>
          Améliorer votre <br />
          <span>système de jeu</span>
        </h1>
        <section>
          <article>
            <h2>Echange par visio - 50€/h</h2>
            <p>
              Séquences de 1h30 autour de votre système de jeu. <br /> <br />
              J’ai une base de données avec des micro attaques, relances de jeu
              et lancement. L’objectif est de partir de votre système et de
              trouver des axes d’améliorations et des pistes de réflexion pour
              le rendre plus efficace et efficient.
            </p>
            <div className={styles.link}>
              <Link href="https://calendly.com/julien-leblanc">
                <a target="_blank">Je prends rendez vous</a>
              </Link>
            </div>
          </article>
          <div className={`${styles.imgWrapper} ${styles.left}`}>
            <Image src={img1} alt={"coaching-1"} />
          </div>
        </section>
        <section>
          {width > 815 && (
            <div
              className={`${styles.imgWrapper} ${styles.right} ${styles.portrait}`}
            >
              <Image src={img2} alt={"coaching-2"} />
            </div>
          )}
          <article>
            <h2>Un intervenant extérieur</h2>

            <p>
              Chaque club possède son histoire, sa philosophie et ses acteurs
              avec leurs compétences. Améliorer ses méthodes de travail et de
              fonctionnement est souvent difficile car cela demande du temps,
              d’autres compétences et de la recherche. Une personne indépendante
              pourra observer, comprendre et proposer avec l’objectif
              d’amélioration de la performance souhaitée
            </p>

            <h3>Pourquoi un intervenant extérieur</h3>
            <ul>
              <li>analyser la structure et les enjeux</li>
              <li>comprendre le projet</li>
              <li>identifier les besoins</li>
              <li>développer des outils</li>
            </ul>
          </article>
          {width < 815 && (
            <div className={styles.imgWrapper}>
              <Image src={img2Paysage} alt={"coaching-2"} />
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Coaching;

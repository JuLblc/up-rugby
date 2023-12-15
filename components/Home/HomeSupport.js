import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import graduation from "../../public/svg/graduation.svg";
import exercice from "../../public/svg/exercice.svg";
import webinar from "../../public/svg/webinar.svg";

const HomeSupport = () => {
  return (
    <section className={`${styles.support} ${styles.supportPadding}`}>
      <div className={styles.body}>
        <h1>
          <span>Plusieurs formats</span> adaptés à vos besoins et à votre budget
        </h1>
        <p>
          Une banque d'exercices variés 100% gratuite, des formations
          approfondies sur différents thèmes ou un coaching particulier à la
          demande!
        </p>
      </div>
      <div className={styles.supportWrapper}>
        <div className={styles.supportItemsContainer}>
          <Link href="/courses">
            <div className={styles.supportItemsContent}>
              <Image src={graduation} alt="graduation" />
              <div>
                <a>Formations uniques et innovantes</a>
                <p>
                  Des formations pour développer des compétences spécifiques.
                </p>
              </div>
            </div>
          </Link>
          <div className={styles.break}></div>
          <Link href="/exercices">
            <div className={styles.supportItemsContent}>
              <Image src={exercice} alt="exercice" />
              <div>
                <a>Une banque d'exercices</a>
                <p>Des exercices variés et ludique pour animer ses séances.</p>
              </div>
            </div>
          </Link>
          <div className={styles.break}></div>
          <Link href="/coaching">
            <div className={styles.supportItemsContent}>
              <Image src={webinar} alt="webinar" />
              <div>
                <a>Accompagnement personnalisé</a>
                <p>
                  Besoin d'un regard extérieur et de conseils sur un projet de
                  jeu?
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSupport;

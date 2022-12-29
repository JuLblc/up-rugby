import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import img1 from "../../public/768-Ruck.jpg";
import img2 from "../../public/scrum.jpeg";
import img3 from "../../public/victory.jpg";

const HomeIntro = (props) => {
  return (
    <section className={styles.intro}>
      <div className={styles.body}>
        <div className={styles.carouselTitleContainer}>
          <div className={styles.carouselTitle}>
            <div className={styles.carouselTitleItem}>
              <h1>
                <span>Améliorez</span> votre compréhension du rugby
                {/* <br /> */}
              </h1>
              <p>
                Analyses précises expliquées à l'aide de montages vidéos et
                powerpoint modifiables. Basées sur les mouvements et
                comportements des joueurs et équipes du haut niveau.
              </p>
            </div>
            <div className={styles.carouselTitleItem}>
              <h1>
                <span>Développez</span> des compétences spécifiques
              </h1>
              <p>
                Il existe des coachs spécialisés pour chaque secteur de jeu.
                Devenir expert d'un domaine demande des connaissances.
                Approfondissez votre expertise sur des sujets précis.
              </p>
            </div>

            <div className={styles.carouselTitleItem}>
              <h1>
                <span>Transmettez</span> à vos joueurs pour gagner{" "}
                {props.width >= 1100 && "les matchs"}
              </h1>
              <p>
                Au rugby, la différence se fait souvent sur des détails.
                Utilisez vos nouvelles compétences pour gagner en efficacité et
                faire basculer le match.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.link}>
          {/* <Link href='/login?login=signup'>
              <a>Créez votre compte</a>
            </Link> */}
          <Link href="/courses">
            <a>Voir les formations</a>
          </Link>
        </div>
      </div>
      {props.width >= 1100 && (
        <div className={styles.carouselWrapper}>
          <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
              <Image src={img3} alt="img" />
              <Image src={img2} alt="img" />
              <Image src={img1} alt="img" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeIntro;

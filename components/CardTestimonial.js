import Image from "next/image";
import styles from "../styles/CardTestimonial.module.css";

const CardTestimonial = (props) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <div>Image</div>
      </div>
      <p>
        Nous avions quelques idées sur les systèmes de jeu et notamment le
        système 1 3 3 1 mais de façon assez globale et empirique…Le détails et
        la finesse de l’analyse nous ont permis de gagner en précision et en
        connaissance. De superbes outils (analyse vidéo, powerpoint…) tant pour
        les éducateurs que pour les joueurs. Je recommande vivement ! Bravo
        Charles !
      </p>
      <span>Adrien Renault</span>
      <span>RESPONSABLE SPORTIF COB79</span>
    </div>
  );
};

export default CardTestimonial;

import Link from "next/link";
import Head from "next/head";

import { getSession } from "next-auth/react";

import { getExercices } from "../../apiCall/exercices";

import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { getDeviceTypeInfo } from "../../utils/utilResponsive";
import { getLecturesQty, getLecturesTime } from "../../utils/utilCourses";

import CardExercice from "../../components/Exercice/CardExercice";

import { UserRole } from "../../constants";
import styles from "../../styles/Courses.module.css";

const Exercices = (props) => {
  const { height, width } = useWindowDimensions();

  const {
    isMobile,
    // isTablet,
    // isDesktopOrLaptop,
    // isBigScreen
  } = getDeviceTypeInfo(width, height);

  return (
    <>
      <Head>
        <title>Exercices - UpRugby</title>
      </Head>
      <main className={styles.cardFormationContainer}>
        <div
          className={`${styles.intro} ${!isMobile && styles.introNotMobile}`}
        >
          <h1>
            Tous les <br />
            <span className={styles.strong}> exercices</span>
          </h1>
          <p>
            Ma passion pour le rugby m'a poussé à créer cette banque
            d'exercices. Comme le rugby est un sport de partage, n'hésite pas à
            en t'inspirer pour animer tes séances. J'attends avec impatience de
            connaître tes exercices favoris !
          </p>
          {props.session?.user.role === UserRole.ADMIN && (
            <Link href="/exercices/create-exercice">
              <a>Ajouter une catégorie d'exercices</a>
            </Link>
          )}
        </div>

        {props.exercices.map((exercice) => (
          <CardExercice
            key={exercice._id}
            exercice={exercice}
            role={props.session?.user.role}
            lecturesQty={getLecturesQty(exercice)}
            lecturesTimes={getLecturesTime(exercice)}
          />
        ))}
      </main>
    </>
  );
};

export default Exercices;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  const res = await getExercices(context);
  const exercices = res.data.exercicesFromDB;

  return {
    props: {
      exercices,
      session,
    },
  };
};

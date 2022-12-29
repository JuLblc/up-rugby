import { getSession } from "next-auth/react";
import { getCourses } from "../apiCall/courses";
import { getExercices } from "../apiCall/exercices";
import { getUser } from "../apiCall/users";
import Head from "next/head";

import { useWindowDimensions } from "../hooks/useWindowDimensions";

import HomeIntro from "../components/Home/HomeIntro";
import HomeSupport from "../components/Home/HomeSupport";
import HomeTestimonial from "../components/Home/HomeTestimonial";

import styles from "../styles/Home.module.css";
import HomeLastCourses from "../components/Home/HomeLastCourses";
import HomeLastExercices from "../components/Home/HomeLastExercices";

const Home = (props) => {
  const { width } = useWindowDimensions();

  return (
    <>
      <Head>
        <title>
          UpRugby - Vidéo de formations, d'exercices et d'entrainements
        </title>
      </Head>
      <main className={styles.home}>
        {!props.session && (
          <>
            <HomeIntro width={width} />
            <HomeSupport />
            <HomeTestimonial width={width} />
          </>
        )}

        {props.session && (
          <>
            <HomeLastCourses
              courses={props.courses}
              session={props.session}
              purchasedCourses={props.purchasedCourses}
              cart={props.cart}
            />
            <HomeLastExercices
              session={props.session}
              exercices={props.exercices}
            />
          </>
        )}
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {
        session,
      },
    };
  }

  const resCourses = await getCourses(context);
  const lastCourses = resCourses.data.coursesFromDB.slice(0, 2);

  const resExercices = await getExercices(context);
  const lastExercices = resExercices.data.exercicesFromDB.slice(0, 2);

  const resUser = await getUser(context);

  return {
    props: {
      cart: resUser.data.userFromDB.cart,
      courses: lastCourses,
      exercices: lastExercices,
      purchasedCourses: resUser.data.userFromDB.purchasedCourses,
      session,
    },
  };
};

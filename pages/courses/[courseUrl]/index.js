import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import Head from "next/head";
import Link from "next/link";

import { getCourses } from "../../../apiCall/courses";
import { getExercices } from "../../../apiCall/exercices";
import {
  getUser,
  putCourseToCart,
  removeCourseToCart,
} from "../../../apiCall/users";
import {
  getLecturesQty,
  getLecturesTime,
  checkPurchaseStatus,
  getRandomContent,
} from "../../../utils/utilCourses";

import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

import SideCourseChapter from "../../../components/SideCourseChapter";
import CtaFormationDetails from "../../../components/Formation/CtaFormationDetails";

import styles from "../../../styles/CourseDetails.module.css";

const FormationDetails = (props) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [isInCart, setisInCart] = useState(props.isInCart);

  useEffect(() => {
    // To prevent 'USER' to see 'ADMIN' courses
    if (!props.course) {
      router.back();
    }
  }, []);

  const startCourse = () => {
    router.push(
      `/courses/${props.course.seoUrl}/lecture/${props.course.chapters[0].lectures[0].seoUrl}?chapter=${props.course.chapters[0].seoUrl}`
    );
  };

  const addCourseToCart = async () => {
    if (!props.session) {
      router.push("/login?login=signin");

      return;
    }

    if (props.session.user.id) {
      setisInCart(true);
      await putCourseToCart(props.course._id);

      return;
    }
  };

  const deleteCourseToCart = async () => {
    if (props.session.user.id) {
      setisInCart(false);
      await removeCourseToCart(props.course._id);
    }
  };

  return (
    <>
      <Head>
        <title>{props.course.title} - UpRugby</title>
      </Head>
      {props.course && (
        <main>
          <h1>{props.course.title}</h1>
          <div className={styles.container}>
            <section className={styles.courseChapters}>
              <h2>Chapitres</h2>
              <SideCourseChapter course={props.course} styles={styles} />
            </section>
            <section className={styles.overview}>
              <h2>Présentation</h2>
              <div>
                <article>{parse(props.course.overview)}</article>
                <div className={styles.argumentsContainer}>
                  <div className={styles.argument}>
                    <span>Informations</span>
                    <ul>
                      <li>{getLecturesTime(props.course)} de vidéo</li>
                      <li>{`${getLecturesQty(props.course)} Chapitre${
                        getLecturesQty(props.course) > 1 ? "s" : ""
                      }`}</li>
                    </ul>
                  </div>
                  {/* {(width >= 1100 || width <= 768) && ( */}
                  {(width >= 1100 || (width >= 620 && width <= 768)) && (
                    <CtaFormationDetails
                      course={props.course}
                      styles={styles}
                      isInCart={isInCart}
                      startCourse={() => startCourse()}
                      deleteCourseToCart={() => deleteCourseToCart()}
                      addCourseToCart={() => addCourseToCart()}
                    />
                  )}

                  <div className={styles.argument}>
                    <span>Liens utiles</span>
                    <ul>
                      {props.randomContent.map((content) => (
                        <li key={content._id}>
                          <Link href={content.seoUrl}>{content.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {((width < 1100 && width > 768) || width < 620) && (
                  <CtaFormationDetails
                    course={props.course}
                    styles={styles}
                    isInCart={isInCart}
                    startCourse={() => startCourse()}
                    deleteCourseToCart={() => deleteCourseToCart()}
                    addCourseToCart={() => addCourseToCart()}
                  />
                )}
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default FormationDetails;

//Server side rendering
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  const resCourse = await getCourses(context, context.query.courseUrl);
  const resAllCourses = await getCourses(context);
  const resExercices = await getExercices(context);

  // eslint-disable-next-line immutable/no-let
  let randomContent = [];

  if (!session) {
    randomContent = getRandomContent(
      resCourse.data.courseFromDB._id,
      resAllCourses.data.coursesFromDB,
      resExercices.data.exercicesFromDB
    );

    return {
      props: {
        course: resCourse.data.courseFromDB,
        randomContent,
        session,
      },
    };
  }

  const resUser = await getUser(context);

  randomContent = getRandomContent(
    resCourse.data.courseFromDB._id,
    resAllCourses.data.coursesFromDB,
    resExercices.data.exercicesFromDB,
    resUser.data.userFromDB.purchasedCourses
  );

  return {
    props: {
      course: resCourse.data.courseFromDB,
      isInCart: checkPurchaseStatus(
        resUser.data.userFromDB.cart,
        resCourse.data.courseFromDB._id
      ),
      purchasedCourses: resUser.data.userFromDB.purchasedCourses,
      randomContent,
      session,
    },
  };
};

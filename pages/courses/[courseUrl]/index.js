import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import Head from "next/head";

import { getCourses } from "../../../apiCall/courses";
import {
  getUser,
  putCourseToCart,
  removeCourseToCart
} from "../../../apiCall/users";
import {
  getLecturesQty,
  getLecturesTime,
  checkPurchaseStatus
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
                      <li>Lien 1</li>
                      <li>Lien 2</li>
                      <li>Lien 3</li>
                    </ul>
                  </div>
                </div>
                {/* {width < 1100 && width > 768 && ( */}
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

  if (!session) {
    return {
      props: {
        session,
        course: resCourse.data.courseFromDB
      }
    };
  }

  const resUser = await getUser(context);

  return {
    props: {
      session,
      course: resCourse.data.courseFromDB,
      purchasedCourses: resUser.data.userFromDB.purchasedCourses,
      isInCart: checkPurchaseStatus(
        resUser.data.userFromDB.cart,
        resCourse.data.courseFromDB._id
      )
    }
  };
};

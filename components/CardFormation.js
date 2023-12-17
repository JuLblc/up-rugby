import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

import { UserRole } from "../constants";
import styles from "../styles/CardFormation.module.css";

import { useWindowDimensions } from "../hooks/useWindowDimensions";

import { putCourseToCart, removeCourseToCart } from "../apiCall/users";

const CardFormation = (props) => {
  const router = useRouter();

  const { width } = useWindowDimensions();

  const divRef = useRef();

  const [selected, setSelected] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isInCart, setisInCart] = useState(props.isInCart);

  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring
    const $p = divRef.current.children[1];

    if ($p.clientHeight < $p.scrollHeight) {
      setIsOverflowing(true);
    }
  }, []);

  const handleSelectedChange = () => {
    const $div = divRef.current.classList;

    if (selected) {
      if ($div.contains("CardFormation_selected__IoyVY")) {
        $div.remove("CardFormation_selected__IoyVY");
      }
      $div.add("CardFormation_unselected__XRc3W");
    }

    if (!selected) {
      if ($div.contains("CardFormation_unselected__XRc3W")) {
        $div.remove("CardFormation_unselected__XRc3W");
      }
      $div.add("CardFormation_selected__IoyVY");
    }
    setSelected(!selected);
  };

  const startCourse = () => {
    router.push(
      `/courses/${props.course.seoUrl}/lecture/${props.course.chapters[0].lectures[0].seoUrl}?chapter=${props.course.chapters[0].seoUrl}`
    );
  };

  const addCourseToCart = async () => {
    if (props.userId) {
      setisInCart(true);
      await putCourseToCart(props.course._id);

      return;
    }

    if (!props.userId) {
      router.push("/login?login=signin");

      return;
    }
  };

  const deleteCourseToCart = async () => {
    if (props.userId) {
      setisInCart(false);
      await removeCourseToCart(props.course._id);
    }
  };

  return (
    <article className={styles.cardFormation}>
      <span className={styles.imgCard}>
        <Image
          src={props.course.img.url}
          alt="img"
          width={props.course.img.width}
          height={props.course.img.height}
        />
      </span>
      <div className={styles.CardFormationWrapper}>
        <div ref={divRef} className={styles.formationInfo}>
          <h3 className={styles.formationTitle}>{props.course.title}</h3>
          {/* if course is a draft, it still can be updated by ADMIN only */}
          {/* {props.role === 'ADMIN' && !props.course.isPublished && ( */}
          {props.role === UserRole.ADMIN && (
            <Link href={`/courses/update-course/${props.course.seoUrl}`}>
              <a className={styles.linkAdmin}>Modifier</a>
            </Link>
          )}
          <p className={styles.formationDescription}>
            {props.course.description}
          </p>
          {isOverflowing && <span className={styles.fadeOut}></span>}
          <div className={styles.cardInfoWrapper}>
            <div className={styles.cardInfoContainer}>
              <div className={styles.cardInfo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="19"
                  height="19"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12h4v4a3 3 0 0 1-3 3zm-1-5v2a1 1 0 0 0 2 0v-2h-2zm-2 3V4H4v15a1 1 0 0 0 1 1h11zM6 7h8v2H6V7zm0 4h8v2H6v-2zm0 4h5v2H6v-2z"
                    fill="rgba(128,128,128,1)"
                  />
                </svg>
                <span>{`${props.lecturesQty} Chapitre${
                  props.lecturesQty > 1 ? "s" : ""
                }`}</span>
              </div>
              <div className={styles.cardInfo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="19"
                  height="19"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
                    fill="rgba(128,128,128,1)"
                  />
                </svg>
                <span>{props.lecturesTimes}</span>
              </div>
            </div>

            <div className={styles.priceContainer}>
              <div className={styles.price}>
                {props.course.price}
                <span>€</span>
              </div>
            </div>
          </div>
          <div className={styles.CTA}>
            <Link href={`/courses/${props.course.seoUrl}`}>
              <a>Détails</a>
            </Link>
            {/* eslint-disable-next-line no-nested-ternary */}
            {props.isPurchased ? (
              <button onClick={startCourse}>
                {width > 350 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="#F4F9FF"
                      d="M7.752 5.439l10.508 6.13a.5.5 0 0 1 0 .863l-10.508 6.13A.5.5 0 0 1 7 18.128V5.871a.5.5 0 0 1 .752-.432z"
                    />
                  </svg>
                )}
                <span>Commencer</span>
              </button>
            ) : isInCart ? (
              <button onClick={deleteCourseToCart} className={styles.removeBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="#e44258"
                    d="M4 6.414L.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414zM5.5 23a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="#e44258"
                    d="M17 4h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5V2h10v2zM9 9v8h2V9H9zm4 0v8h2V9h-2z"
                  />
                </svg>
              </button>
            ) : (
              <button onClick={addCourseToCart}>
                {width > 350 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="#f7fafb"
                      d="M4 6.414L.757 3.172l1.415-1.415L5.414 5h15.242a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6v2h11v2H5a1 1 0 0 1-1-1V6.414zM5.5 23a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                    />
                  </svg>
                )}
                <span>Ajouter</span>
              </button>
            )}
          </div>
        </div>
        <div
          className={styles.cardFooterContainer}
          onClick={handleSelectedChange}
        >
          {!selected && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
                fill="rgba(128,128,128,1)"
              />
            </svg>
          )}

          {selected && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"
                fill="rgba(128,128,128,1)"
              />
            </svg>
          )}
        </div>
      </div>
    </article>
  );
};

export default CardFormation;

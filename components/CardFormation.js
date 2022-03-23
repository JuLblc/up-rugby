import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import styles from "../styles/CardFormation.module.css";

import { useWindowDimensions } from "../hooks/useWindowDimensions";

import { getDeviceTypeInfo } from "../utils/utilResponsive";

const CardFormation = (props) => {
  const { width, height } = useWindowDimensions();
  const { isMobile, isTablet } = getDeviceTypeInfo(width, height);

  const [selected, setSelected] = useState(false);

  const divRef = useRef();

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

  return (
    <article
      className={styles.cardFormation}
      onMouseEnter={isTablet || isMobile ? undefined : handleSelectedChange}
      onMouseLeave={isTablet || isMobile ? undefined : handleSelectedChange}
    >
      <span className={styles.imgCard}>
        <Image
          src={props.img.url}
          alt="img"
          width={props.img.width}
          height={props.img.height}
        />
      </span>
      <div className={styles.CardFormationWrapper}>
        <div ref={divRef} className={styles.formationInfo}>
          <h3 className={styles.formationTitle}>{props.title}</h3>
          {/* if course is a draft, it still can be updated by ADMIN only */}
          {props.role === "ADMIN" && !props.isPublished && (
            <Link href={`/courses/update-course/${props.seoUrl}`}>
              <a className={styles.linkAdmin}>Modifier</a>
            </Link>
          )}
          <p className={styles.formationDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
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
                {props.price}
                <span>€</span>
              </div>
            </div>
          </div>
          <div className={styles.CTA}>
            <Link href={`/courses/${props.seoUrl}`}>
              <a className={styles.linkDetails}>Détails</a>
            </Link>
            <button>
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
              <span>Acheter</span>
            </button>
          </div>
        </div>
        <div
          className={styles.cardFooterContainer}
          onClick={isTablet || isMobile ? handleSelectedChange : undefined}
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

import styles from "../../styles/Home.module.css";

import { testimonials } from "./constants";

import CardTestimonial from "../../components/CardTestimonial";

import { useEffect, useState, useRef } from "react";
import { computeItemsProperies } from "./utils/computeItemsProperies";

const useDisplayItems = ({
  displayItems,
  offset,
  setDisplayItems,
  sliderRef,
  windowsWidth,
}) => {
  useEffect(() => {
    const updatedItems = computeItemsProperies(sliderRef.current, windowsWidth);

    setDisplayItems({ ...updatedItems });

    const distanceMovedToRight = offset * displayItems.itemWidth;

    sliderRef.current.style.left = `${distanceMovedToRight}%`;
  }, [windowsWidth]);
};

const HomeTestimonial = (props) => {
  const [offset, setOffset] = useState(0);
  const [displayItems, setDisplayItems] = useState({
    itemWidth: -33.3333,
    items: 3,
  });
  const sliderRef = useRef();

  const { width } = props;

  useDisplayItems({
    displayItems,
    offset,
    setDisplayItems,
    sliderRef,
    windowsWidth: width,
  });

  const clickIncrease = () => {
    if (offset < testimonials.length - displayItems.items) {
      sliderRef.current.style.left = `${
        (offset + 1) * displayItems.itemWidth
      }%`;
      setOffset(offset + 1);
    }
  };

  const clickDecrease = () => {
    if (offset > 0) {
      sliderRef.current.style.left = `${
        (offset - 1) * displayItems.itemWidth
      }%`;
      setOffset(offset - 1);
    }
  };

  return (
    <section className={styles.testiContainer}>
      <div className={`${styles.body} ${styles.bodyTestimonial}`}>
        <h1>
          <span>Témoignages</span> d'entraineurs
        </h1>
        <p>Consultez les témoignages les plus marquants.</p>
        <div className={styles.bodyComment}>
          Certains entraîneurs ont préféré garder l'anonymat (notamment Fed. 2
          et au dessus), je travail à révéler leur identité!
        </div>

        {/* Displaying button above testimonial container*/}
        {props.width > 720 && (
          <div className={styles.btnContainer}>
            <button
              className={`${styles.swipeBtn} ${
                offset === 0 ? styles.btnDisabled : undefined
              }`}
              type="button"
              onClick={clickDecrease}
              disabled={offset === 0 ? true : false}
            >
              {"<"}
            </button>
            <button
              className={`${styles.swipeBtn} ${
                offset === testimonials.length - displayItems.items
                  ? styles.btnDisabled
                  : undefined
              }`}
              type="button"
              onClick={clickIncrease}
              disabled={
                offset === testimonials.length - displayItems.items
                  ? true
                  : false
              }
            >
              {">"}
            </button>
          </div>
        )}
      </div>
      <div className={styles.sliderContainer}>
        <div ref={sliderRef} className={styles.slider}>
          {testimonials.map((testimonial) => (
            <CardTestimonial
              key={testimonial.id}
              img={testimonial.img}
              content={testimonial.content}
              name={testimonial.name}
              jobs={testimonial.jobs}
            />
          ))}
        </div>
        {/* Displaying button below testimonial container */}
        {props.width <= 720 && (
          <>
            <button
              className={`${styles.swipeBtn} ${styles.swipeBtnMob} ${
                offset === 0 ? styles.btnDisabled : undefined
              }`}
              type="button"
              onClick={clickDecrease}
              disabled={offset === 0 ? true : false}
            >
              {"<"}
            </button>
            <button
              className={`${styles.swipeBtn} ${styles.swipeBtnMob} ${
                styles.swipeBtnMobRight
              } ${
                offset === testimonials.length - displayItems.items
                  ? styles.btnDisabled
                  : undefined
              }`}
              type="button"
              onClick={clickIncrease}
              disabled={
                offset === testimonials.length - displayItems.items
                  ? true
                  : false
              }
            >
              {">"}
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default HomeTestimonial;

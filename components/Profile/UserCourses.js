import Link from "next/link";
import Image from "next/image";
import React from "react";

// import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { getLecturesQty, getLecturesTime } from "../../utils/utilCourses";

const UserCourses = (props) => {
  // const { width } = useWindowDimensions();

  return (
    <div className={props.styles.coursesWrapper}>
      {props.courses.length > 0 ? (
        props.courses.map((course) => {
          const lecturesQty = getLecturesQty(course);
          const lecturesTimes = getLecturesTime(course);

          return (
            <div className={props.styles.courseContainer} key={course._id}>
              <div className={props.styles.courseInfoContainer}>
                <Image
                  src={course.img.url}
                  alt="img"
                  width={course.img.width}
                  height={course.img.height}
                />
                <div className={props.styles.courseInfo}>
                  <Link href={`/courses/${course.seoUrl}`}>
                    <h5>{course.title}</h5>
                  </Link>
                  <p>{course.description}</p>
                </div>
              </div>
              <div className={props.styles.courseDetailsWrapper}>
                <div className={props.styles.courseDetailsContainer}>
                  <div className={props.styles.courseDetails}>
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
                    <span>{`${lecturesQty} Chapitre${
                      lecturesQty > 1 ? "s" : ""
                    }`}</span>
                  </div>
                  <div className={props.styles.courseDetails}>
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
                    <span>{lecturesTimes}</span>
                  </div>
                </div>
                {props.CTA === "start" ? (
                  <Link
                    href={`/courses/${course.seoUrl}/lecture/${course.chapters[0].lectures[0].seoUrl}?chapter=${course.chapters[0].seoUrl}`}
                  >
                    <a className={props.styles.start}>Commencer</a>
                  </Link>
                ) : (
                  <>
                    <div className={props.styles.priceContainer}>
                      <div className={props.styles.price}>
                        {course.price}
                        <span>€</span>
                      </div>
                    </div>
                    <button
                      className={props.styles.removeBtn}
                      onClick={() => props.deleteCourseToCart(course._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"
                          fill="#808080"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div>Vous n'avez pas encore acheté de formations</div>
      )}
    </div>
  );
};

export default UserCourses;

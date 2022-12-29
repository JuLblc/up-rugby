import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState, useEffect } from "react";

import { getCourses } from "../apiCall/courses";
import { getUser, putUser, removeCourseToCart } from "../apiCall/users";
import { cookiesToMetadata } from "../utils/utilStripe";

import Sidebar from "../components/Profile/Sidebar";
import UserCourses from "../components/Profile/UserCourses";
import UserCart from "../components/Profile/UserCart";
import UserInfo from "../components/Profile/UserInfo";
import styles from "../styles/Profile.module.css";

const Profile = (props) => {
  // Prevent to be undefined
  !props.userFromDB.firstName
    ? (props.userFromDB.firstName = "")
    : props.userFromDB.firstName;
  !props.userFromDB.lastName
    ? (props.userFromDB.lastName = "")
    : props.userFromDB.lastName;
  !props.userFromDB.club ? (props.userFromDB.club = "") : props.userFromDB.club;

  const [state, setState] = useState({
    cart: props.cart,
    disableField: true,
    displayCart: false,
    displayCourses: false,
    displayInfo: true,
  });

  useEffect(() => {
    if (props.profileOpt === "cart") {
      setState({
        ...state,
        displayCart: true,
        displayCourses: false,
        displayInfo: false,
      });

      return;
    }

    if (props.profileOpt === "courses") {
      setState({
        ...state,
        displayCart: false,
        displayCourses: true,
        displayInfo: false,
      });

      return;
    }

    if (props.profileOpt === "userInfo") {
      setState({
        ...state,
        displayCart: false,
        displayCourses: false,
        displayInfo: true,
      });

      return;
    }
  }, []);

  const [userData, setUserData] = useState(props.userFromDB);

  const inputs = [
    {
      id: 1,
      label: "Prénom: ",
      name: "firstName",
      type: "text",
    },
    {
      id: 2,
      label: "Nom: ",
      name: "lastName",
      type: "text",
    },
    {
      id: 3,
      label: "Club: ",
      name: "club",
      type: "text",
    },
  ];

  const li = [
    {
      id: "info",
      label: "Mes informations",
      styles: state.displayInfo ? styles.selected : styles.unselected,
    },
    {
      id: "course",
      label: "Mes achats",
      styles: state.displayCourses ? styles.selected : styles.unselected,
    },
    {
      id: "cart",
      label: "Mon panier",
      styles: state.displayCart ? styles.selected : styles.unselected,
    },
  ];

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleDisplay = (e) => {
    if (e.target.id === "info" && !state.displayInfo) {
      setState({
        ...state,
        displayCart: false,
        displayCourses: false,
        displayInfo: true,
      });
    }

    if (e.target.id === "course" && !state.displayCourses) {
      setState({
        ...state,
        displayCart: false,
        displayCourses: true,
        displayInfo: false,
      });
    }

    if (e.target.id === "cart" && !state.displayCart) {
      setState({
        ...state,
        displayCart: true,
        displayCourses: false,
        displayInfo: false,
      });
    }
  };

  const editUserData = () => {
    setState({
      ...state,
      disableField: false,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      disableField: true,
    });

    await putUser(userData);
  };

  const deleteCourseToCart = async (id) => {
    const newState = { ...state };
    const idx = newState.cart.map((course) => course._id).indexOf(id);

    newState.cart.splice(idx, 1);

    setState({
      ...state,
      cart: newState.cart,
    });
    await removeCourseToCart(id);
  };

  return (
    <>
      <Head>
        <title>Mon compte - UpRugby</title>
      </Head>
      <main className={styles.profile}>
        <h1>Mon compte</h1>

        <div className={styles.profileContainer}>
          <Sidebar li={li} styles={styles} handleDisplay={handleDisplay} />

          {state.displayInfo && (
            <UserInfo
              styles={styles}
              handleFormSubmit={handleFormSubmit}
              inputs={inputs}
              userData={userData}
              onChange={onChange}
              disableField={state.disableField}
              editUserData={editUserData}
            />
          )}

          {state.displayCourses && (
            <UserCourses
              courses={props.purchasedCourses}
              styles={styles}
              CTA="start"
            />
          )}

          {state.displayCart && (
            <UserCart
              cart={state.cart}
              deleteCourseToCart={deleteCourseToCart}
              styles={styles}
              userEmail={userData.email}
              cookies={props.cookies}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Profile;

//Server side rendering
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login?login=signin",
        permanent: false,
      },
    };
  }

  const profileOpt = context.query.profile;
  const cookies = cookiesToMetadata(context.req.headers.cookie);

  const resUser = await getUser(context);

  const { userFromDB } = resUser.data;
  const purchasedCoursesId = resUser.data.userFromDB.purchasedCourses;
  const cartCoursesId = resUser.data.userFromDB.cart;

  // eslint-disable-next-line immutable/no-let
  let resCourses;

  // eslint-disable-next-line immutable/no-let
  let purchasedCourses = [];

  if (purchasedCoursesId || cartCoursesId) {
    resCourses = await getCourses(context);
  }

  if (purchasedCoursesId) {
    purchasedCourses = resCourses.data.coursesFromDB.filter((course) =>
      purchasedCoursesId.includes(course._id)
    );
  }

  // eslint-disable-next-line immutable/no-let
  let cart = [];

  if (cartCoursesId) {
    cart = resCourses.data.coursesFromDB.filter((course) =>
      cartCoursesId.includes(course._id)
    );
  }

  return {
    props: {
      cart,
      cookies,
      profileOpt,
      purchasedCourses,
      session,
      userFromDB,
    },
  };
};

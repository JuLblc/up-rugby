import { getSession } from "next-auth/react";
import { useState } from "react";

import { getCourses } from "../apiCall/courses";
import { getUser, putUser } from "../apiCall/users";

import Sidebar from "../components/Profile/Sidebar";
import UserCourses from "../components/Profile/UserCourses";
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
    displayInfo: true,
    displayCourses: false,
    displayCart: false,
    disableField: true
  });

  const [userData, setUserData] = useState(props.userFromDB);

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      label: "Prénom: "
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      label: "Nom: "
    },
    {
      id: 3,
      name: "club",
      type: "text",
      label: "Club: "
    }
  ];

  const li = [
    {
      id: "info",
      styles: state.displayInfo ? styles.selected : styles.unselected,
      label: "Mes informations"
    },
    {
      id: "course",
      styles: state.displayCourses ? styles.selected : styles.unselected,
      label: "Mes achats"
    },
    {
      id: "cart",
      styles: state.displayCart ? styles.selected : styles.unselected,
      label: "Mon panier"
    }
  ];

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleDisplay = (e) => {
    if (e.target.id === "info" && !state.displayInfo) {
      setState({
        ...state,
        displayInfo: true,
        displayCourses: false,
        displayCart: false
      });
    }

    if (e.target.id === "course" && !state.displayCourses) {
      setState({
        ...state,
        displayInfo: false,
        displayCourses: true,
        displayCart: false
      });
    }

    if (e.target.id === "cart" && !state.displayCart) {
      setState({
        ...state,
        displayInfo: false,
        displayCourses: false,
        displayCart: true
      });
    }
  };

  const editUserData = () => {
    setState({
      ...state,
      disableField: false
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      disableField: true
    });

    await putUser(userData);
  };

  return (
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
            purchasedCourses={props.purchasedCourses}
            styles={styles}
          />
        )}
      </div>
    </main>
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
        permanent: false
      }
    };
  }

  const resUser = await getUser(context);

  const userFromDB = resUser.data.userFromDB;
  const purchasedCoursesId = resUser.data.userFromDB.purchasedCourses;

  let purchasedCourses = [];
  if (purchasedCoursesId) {
    const resCourses = await getCourses(context);

    purchasedCourses = resCourses.data.coursesFromDB.filter((course) =>
      purchasedCoursesId.includes(course._id)
    );
  }

  return {
    props: {
      session,
      userFromDB,
      purchasedCourses
    }
  };
};

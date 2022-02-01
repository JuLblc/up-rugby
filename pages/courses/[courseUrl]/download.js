import axios from "axios";

import { getSession } from "next-auth/react";
import Link from "next/link";

const Download = (props) => {
  return (
    <>
      <h1>Download Page</h1>
      {props.course.attachements.map((file) => (
        <Link href={file.url} key={file._id}>
          <a>{file.fileName}</a>
        </Link>
      ))}
    </>
  );
};

export default Download;

//Server side rendering
export const getServerSideProps = async (context) => {
  //console.log('context: ', context)
  const session = await getSession(context);
  // console.log('session getServerSideProps FormationDetails: ', session)

  const headers = {};
  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie;
  }

  const resCourse = await axios.get(`${process.env.DOMAIN_URL}/api/courses/`, {
    params: { url: context.query.courseUrl },
    headers
  });

  // Check if user already purchased this course. Pass the result as props
  const course = resCourse.data.courseFromDB;

  if (!session || session.user.role === "ADMIN") {
    course.isPurchased = false;
  } else {
    const resUser = await axios.get(`${process.env.DOMAIN_URL}/api/users/`, {
      headers
    });
    const purchasedCourses = resUser.data.userFromDB.purchasedCourses;

    if (purchasedCourses.indexOf(course._id) === -1) {
      course.isPurchased = false;
    } else {
      course.isPurchased = true;
    }
  }

  return {
    props: {
      session,
      course
    }
  };
};

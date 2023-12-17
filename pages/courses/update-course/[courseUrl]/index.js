import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getCourses } from "../../../../apiCall/courses";

import { UserRole } from "../../../../constants";
import Formation from "../../../../components/FormFormation/Formation";

const UpdateCourseDetails = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (!props.session) {
      router.push("/login?login=signin");

      return;
    }

    if (props.session.user.role !== UserRole.ADMIN) {
      router.back();
    }
  }, []);

  return (
    <main>
      {props.course && (
        <>
          <h1>{props.course.title}</h1>

          <Formation
            courseContent={props.course}
            action={"update"}
            disable={true}
          />
        </>
      )}
    </main>
  );
};

export default UpdateCourseDetails;

//Server side rendering
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  // Check if user is authorized before sending request
  if (!session || session.user.role !== UserRole.ADMIN) {
    return {
      props: {
        session,
      },
    };
  }

  const res = await getCourses(context, context.query.courseUrl);

  return {
    props: {
      course: res.data.courseFromDB,
      session,
    },
  };
};

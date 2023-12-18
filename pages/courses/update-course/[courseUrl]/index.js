import { getSession } from "next-auth/react";
import { getCourses } from "../../../../apiCall/courses";
import Formation from "../../../../components/FormFormation/Formation";
import { isAdmin } from "../../../../utils/session";
import { useRedirectUnauthorizedUser } from "../../../../hooks/useRedirectUnauthorizedUser";

const UpdateCourseDetails = (props) => {
  useRedirectUnauthorizedUser(props.session);

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

  const isRoleAdmin = isAdmin(session?.user.role);
  // Check if user is authorized before sending request

  if (!session || !isRoleAdmin) {
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

import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getCourses } from "../../../../apiCall/courses";
import Formation from "../../../../components/FormFormation/Formation";
import { isAdmin } from "../../../../utils/session";

const UpdateCourseDetails = (props) => {
  const router = useRouter();
  const isRoleAdmin = isAdmin(props.session?.user.role);

  useEffect(() => {
    if (!props.session) {
      router.push("/login?login=signin");

      return;
    }

    if (!isRoleAdmin) {
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

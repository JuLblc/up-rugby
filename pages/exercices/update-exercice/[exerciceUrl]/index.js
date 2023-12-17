import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getExercices } from "../../../../apiCall/exercices";
import Exercice from "../../../../components/FormExercice/Exercice";
import { isAdmin } from "../../../../utils/session";

const UpdateExerciceDetails = (props) => {
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
      {props.exercice && (
        <>
          <h1>{props.exercice.title}</h1>

          <Exercice
            exerciceContent={props.exercice}
            action={"update"}
            disable={true}
          />
        </>
      )}
    </main>
  );
};

export default UpdateExerciceDetails;

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

  const res = await getExercices(context, context.query.exerciceUrl);

  return {
    props: {
      exercice: res.data.exerciceFromDB,
      session,
    },
  };
};

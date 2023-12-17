import Exercice from "../../components/FormExercice/Exercice";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isAdmin } from "../../utils/session";

const NewExercice = (props) => {
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

  const emptyExercice = {
    chapters: [
      {
        // lectures: [{ url: "", duration: 0 }],
        lectures: [],

        subchapters: [],
        title: "",
      },
    ],

    description: "",

    // set image by default
    img: {
      fileName: "defaut.jpeg",
      url: "https://res.cloudinary.com/uprugby/image/upload/v1654247035/uprugby-uploads-pict-formation/defaut.jpeg.jpg",
      width: 768,
    },

    isPublished: false,
    seoUrl: "",
    title: "",
  };

  return (
    <main>
      {props.session && isRoleAdmin && (
        <>
          <h1>Ajouter Exercices</h1>

          <Exercice
            exerciceContent={emptyExercice}
            action={"create"}
            disable={false}
          />
        </>
      )}
    </main>
  );
};

export default NewExercice;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

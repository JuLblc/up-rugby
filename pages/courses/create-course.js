import { getSession } from "next-auth/react";
import Formation from "../../components/FormFormation/Formation";
import { useRedirectUnauthorizedUser } from "../../hooks/useRedirectUnauthorizedUser";

const NewCourse = (props) => {
  useRedirectUnauthorizedUser(props.session);

  const emptyCourse = {
    attachments: [],
    category: "",

    chapters: [
      {
        lectures: [
          {
            description: "",
            duration: 0,
            seoUrl: "",
            title: "",
            url: "",
          },
        ],
        seoUrl: "",
        title: "",
      },
    ],

    description: "",

    // set image by default
    img: {
      fileName: "defaut.jpeg",
      height: 450,
      url: "https://res.cloudinary.com/uprugby/image/upload/v1654247035/uprugby-uploads-pict-formation/defaut.jpeg.jpg",
      width: 768,
    },

    isPublished: false,

    overview: "",
    price: 0,
    seoUrl: "",
    title: "",
  };

  return (
    <main>
      <>
        <h1>Ajouter formation</h1>

        <Formation
          courseContent={emptyCourse}
          action={"create"}
          disable={false}
        />
      </>
    </main>
  );
};

export default NewCourse;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};

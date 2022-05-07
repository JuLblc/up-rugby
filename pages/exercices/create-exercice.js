import Exercice from "../../components/FormExercice/Exercice";

const emptyExercice = {
  title: "",
  description: "",
  seoUrl: "",
  // set image by default
  img: {
    fileName: "logo.png",
    url:
      "https://res.cloudinary.com/dwznpgbcd/image/upload/v1646205285/uprugby-uploads-pict-formation/logo.png.png",
    width: 1528,
    height: 1004
  },
  chapters: [
    {
      title: "",
      lectures: [{
        url: "",
        duration: 0,
      }]
    }
  ],
  isPublished: false
};

const NewExercice = (props) => {
  return (
    <main>
      <h1>Ajouter Exercices</h1>
      <Exercice
        exerciceContent={emptyExercice}
        action={"create"}
        disable={false}
      />
    </main>
  );
};

export default NewExercice;

import Category from "../../components/FormExercice/Category";

const emptyExercice = {
  category: "",
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
  exercices: [
    {
      chapter: "",
      seoUrl: ""
    }
  ],
  isPublished: false
};

const NewExercice = (props) => {
  return (
    <main>
      <h1>Ajouter Exercices</h1>
      <Category
        exerciceContent={emptyExercice}
        action={"create"}
        disable={false}
      />
    </main>
  );
};

export default NewExercice;

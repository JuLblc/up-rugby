import Exercice from "../../components/FormExercice/Exercice";

const emptyExercice = {
  title: "",
  description: "",
  seoUrl: "",
  // set image by default
  img: {
    fileName: "bloc-1331.jpg",
    url:
    "https://res.cloudinary.com/dwznpgbcd/image/upload/v1644428743/uprugby-uploads-pict-formation/bloc-1331.jpg.jpg",
    width: 768,
    height: 450
  },
  chapters: [
    {
      title: "",
      // lectures: [{ url: '', duration: 0 }]
      lectures: [],
      subchapters:[]
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
        // disable={false}
      />
    </main>
  );
};

export default NewExercice;

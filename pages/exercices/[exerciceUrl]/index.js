import { getExercices } from "../../../apiCall/exercices";

const ExerciceDetails = (props) => {
  return <main>{props.exercice[0].description}</main>;
};

export default ExerciceDetails;

//Server side rendering
export const getServerSideProps = async (context) => {
  const resExercice = await getExercices(context, context.query.exerciceUrl);

  const exercice = resExercice.data.exerciceFromDB;
  return {
    props: {
      exercice
    }
  };
};

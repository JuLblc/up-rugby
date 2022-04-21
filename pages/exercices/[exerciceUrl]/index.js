import { getExercices } from "../../../apiCall/exercices";

const ExerciceDetails = (props) => {
  return <main>{props.exercices[0].description}</main>;
};

export default ExerciceDetails;

//Server side rendering
export const getServerSideProps = async (context) => {
  const resExercices = await getExercices(context, context.query.exerciceUrl);

  const exercices = resExercices.data.exercicesFromDB;
  return {
    props: {
      exercices
    }
  };
};

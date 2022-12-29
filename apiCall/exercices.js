import axios from "axios";

export const getExercices = async (context, url) => {
  const headers = {};

  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie;
  }

  return await axios.get(`${process.env.DOMAIN_URL}/api/exercices`, {
    headers,
    params: { url },
  });
};

export const postExercice = async (exerciceData) => {
  console.log("exerciceData: ", exerciceData);

  return axios.post("/api/exercices", { exercice: exerciceData });
};

export const putExercice = async (updatedExercice) => {
  return axios.put("/api/exercices", { exercice: updatedExercice });
};

export const removeExercice = async (deletedExercice) => {
  axios.delete("/api/exercices", { data: deletedExercice._id });
};

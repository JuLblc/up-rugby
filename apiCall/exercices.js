import axios from "axios";

export const getExercices = async (context, url) => {
  // const headers = {};
  // if (context.req.headers.cookie) {
  //   headers.cookie = context.req.headers.cookie;
  // }

  return await axios.get(`${process.env.DOMAIN_URL}/api/exercices`, {
    params: { url },
    // headers
  });
};

export const postExercice = async (exerciceData) => {
  return axios.post("/api/exercices", { exercice: exerciceData });
};

import axios from "axios";

export const getUser = async (context) => {
  const headers = {};
  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie;
  }

  return await axios.get(`${process.env.DOMAIN_URL}/api/users/`, {
    headers
  });
};

export const putUser = async (updatedUser) => {
  await axios.put(`/api/users`, {
    updatedUser
  });
};

export const putCourseToUser = async (courseId) => {
  await axios.put(`/api/users/add-course-to-user`, {
    courseId
  });
};

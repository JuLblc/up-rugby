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
  console.log('courseId: ', courseId, process.env.DOMAIN_URL)
  try {
    await axios.put(`/api/users/add-course-to-user`, {
    // await axios.put(`http://localhost:3000/api/users/add-course-to-user`, {
      courseId
    });
  } catch (error) {
   console.log('err: ', error)
  }

};

export const putCourseToCart = async (courseId) => {
  await axios.put(`/api/users/course-to-cart`, {
    courseId
  });
};

export const removeCourseToCart = async (courseId) => {
  await axios.delete(`/api/users/course-to-cart`, { data: courseId });
};

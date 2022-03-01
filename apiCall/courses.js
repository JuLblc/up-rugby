import axios from 'axios'

export const getCourses = async (context, url) => {
  const headers = {}
  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie
  }

  return await axios.get(`${process.env.DOMAIN_URL}/api/courses`, {
    params: { url },
    headers
  })
}

export const postCourse = async courseData => {
    return axios.post('/api/courses', { course: courseData })
  }

export const putCourse = async updatedCourse => {
  return axios.put('/api/courses', { course: updatedCourse })
}

export const removeCourse = async deletedCourse => {
  axios.delete('/api/courses', { data: deletedCourse._id })
}

export const putCommentToCourse = async updatedCourse => {
  axios.put('/api/courses/add-comment-to-course', { course: updatedCourse })
}

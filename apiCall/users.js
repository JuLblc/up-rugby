import axios from 'axios'
import { cookiesToStr } from '../utils/utilStripe'

export const getUser = async context => {
  const headers = {}
  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie
  }

  return await axios.get(`${process.env.DOMAIN_URL}/api/users/`, {
    headers
  })
}

export const putUser = async updatedUser => {
  await axios.put(`/api/users`, {
    updatedUser
  })
}

export const putCourseToUser = async (courseId, cookies) => {

  console.log('courseId: ', courseId,'cookies: ', cookies )
  console.log('process.env.DOMAIN_URL: ', process.env.DOMAIN_URL)

  if (!process.env.DOMAIN_URL) {
    await axios.put(`/api/users/add-course-to-user`, {
      courseId
    })
    return
  }

  const headers = {
    cookie: cookiesToStr(cookies)
  }
  console.log('headers: ', headers)
  
  await axios.put(
    `${process.env.DOMAIN_URL}/api/users/add-course-to-user`,
    { courseId },
    { headers }
  )
}

export const putCourseToCart = async courseId => {
  await axios.put(`/api/users/course-to-cart`, {
    courseId
  })
}

export const removeCourseToCart = async (courseId, cookies) => {

  if (!process.env.DOMAIN_URL) {
    await axios.delete(`/api/users/course-to-cart`, { data: courseId })
    return
  }

  const headers = {
    cookie: cookiesToStr(cookies)
  }
  await axios.delete(`${process.env.DOMAIN_URL}/api/users/course-to-cart`, {
    headers,
    data: courseId
  })
}

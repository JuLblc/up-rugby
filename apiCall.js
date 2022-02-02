import axios from 'axios'

export const getCourses = async (context, url) => {
  const headers = {}
  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie
  }

  const res = await axios.get(`${process.env.DOMAIN_URL}/api/courses`, {
    params: { url },
    headers
  })

  return res
}

export const getUser = async context => {
  const headers = {}
  if (context.req.headers.cookie) {
    headers.cookie = context.req.headers.cookie
  }

  const resUser = await axios.get(`${process.env.DOMAIN_URL}/api/users/`, {
    headers
  })

  return resUser
}

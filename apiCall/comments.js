import axios from 'axios'

export const postComment = async commentData => {
  return await axios.post('/api/comment', { comment: commentData })
}

export const getComment = async (id) => {
  return await axios.get('/api/comment', {
    params: { id }
  })
}

export const postReply = async (id, replyData) => {
  return await axios.post('/api/comment', { reply: replyData, id })
}
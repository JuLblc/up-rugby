import axios from 'axios'

export const postComment = async commentData => {
  return await axios.post('/api/comment', { comment: commentData })
}

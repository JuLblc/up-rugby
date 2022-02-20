const { connectToDatabase } = require('../../../utils/mongodb')

import Comment from '../../../models/Comment.model'

import { getSession } from 'next-auth/react'

export default async function handler (req, res) {
  const session = await getSession({ req })
  const { method, query } = req

  connectToDatabase()
    .then(() => {
      switch (method) {
        case 'POST':
          addComment(req, res, session)
          break
      }
    })
    .catch(err => {
      console.log(err)
      res
        .status(400)
        .json({ message: 'La connexion à la base de donnée a échoué' })
    })
}

const addComment = (req, res, session) => {
  const { comment } = req.body

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const newComment = new Comment(comment)

  newComment
    .save()
    .then(newCommentFromDB => {

      res.status(200).json({ newCommentFromDB })
    })
    .catch(err => console.log('err : ', err))
}

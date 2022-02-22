const { connectToDatabase } = require('../../../utils/mongodb')

import Course from '../../../models/Course.model'

import { getSession } from 'next-auth/react'

export default async function handler (req, res) {
  const session = await getSession({ req })
  const { method } = req

  connectToDatabase()
    .then(() => {
      switch (method) {
        case 'PUT':
          addCommentToCourse(req, res, session)
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

const addCommentToCourse = (req, res, session) => {
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const id = req.body.course._id
  const updatedCourse = req.body.course

  Course.findByIdAndUpdate(id, updatedCourse, { new: true })
    .then(updatedCourseFromDB => {
      res.status(200).json({ updatedCourseFromDB })
    })
    .catch(err => console.log('err : ', err))
}

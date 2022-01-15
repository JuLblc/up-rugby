const { connectToDatabase } = require('../../../utils/mongodb')

import User from '../../../models/User.model'

import { getSession } from 'next-auth/react'

export default async function handler (req, res) {
  const session = await getSession({ req })
  const { method } = req

  connectToDatabase()
    .then(() => {
      switch (method) {
        case 'GET':
          console.log('get user')
          break
        case 'PUT':
          console.log('put user')
          updateUser(req, res)
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

const updateUser = (req, res) => {

  const { userId, courseId } = req.body

  User.findById(userId)
    .then(foundUser => {
      foundUser.pruchasedCourses.push(courseId)

      foundUser
        .save()
        .then(updateUser => {
          res.status(200).json({ updateUser })
        })
        .catch(err => console.log('err : ', err))
    })
    .catch(err => console.log('err : ', err))
}

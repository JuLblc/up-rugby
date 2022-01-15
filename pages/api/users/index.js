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
          getUser(req, res)
          break
        case 'PUT':
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

const getUser = (req, res) => {
  const id = req.query.id

  const cond = { _id: id }

  User.findOne(cond)
    .then(userFromDB => {
      res.status(200).json({ userFromDB })
    })
    .catch(err => console.log('err : ', err))
}

const updateUser = (req, res) => {
  const { userId, courseId } = req.body

  User.findById(userId)
    .then(foundUser => {
      foundUser.purchasedCourses.push(courseId)

      foundUser
        .save()
        .then(updatedUser => {
          res.status(200).json({ updatedUser })
        })
        .catch(err => console.log('err : ', err))
    })
    .catch(err => console.log('err : ', err))
}

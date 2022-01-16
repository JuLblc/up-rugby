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
          getUser(req, res, session)
          break
        case 'PUT':
          updateUser(req, res, session)
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

const getUser = (req, res, session) => {
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const cond = { _id: session.user.id }

  User.findOne(cond)
    .then(userFromDB => {
      res.status(200).json({ userFromDB })
    })
    .catch(err => console.log('err : ', err))
}

const updateUser = (req, res, session) => {
  if (!session) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  const { courseId } = req.body

  User.findById(session.user.id)
    .then(foundUser => {
      // Check if course already in purchasedCourses
      if (foundUser.purchasedCourses.indexOf(courseId) === -1) {
        foundUser.purchasedCourses.push(courseId)

        foundUser
          .save()
          .then(updatedUser => {
            res.status(201).json({ updatedUser })
          })
          .catch(err => console.log('err : ', err))
      } else {
        res.status(400).json({ message: 'Cette formation a déjà été acheté' })
      }
    })
    .catch(err => console.log('err : ', err))
}

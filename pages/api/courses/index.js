const { connectToDatabase } = require('../../../utils/mongodb')

import User from '../../../models/User.model'
import Course from '../../../models/Course.model'

import { getSession } from 'next-auth/react'

export default async function handler (req, res) {
  
  const session = await getSession({ req })
  const { method, query } = req

  console.log('session API: ', session)

  connectToDatabase()
    .then(() => {
      switch (method) {
        case 'GET':
          if (!query.id) {
            getAllCourses(req, res)
            break
          } else {
            getCourse(req, res)
            break
          }
        case 'POST':
          addCourse(req, res)
          break
        case 'PUT':
          upadteCourse(req, res, session)
          break
        case 'DELETE':
          deleteCourse(req, res)
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

const addCourse = (req, res) => {
  //console.log('req: ', req)
  const { course } = req.body

  if (session.user.role === 'USER'){
    res.status(401).json({ message: 'Unauthorized' })
  }
  //   console.log('course: ', course)

  const newCourse = new Course(course)

  newCourse
    .save()
    .then(newCourseFromDB => {
      res.status(200).json({ newCourseFromDB })
    })
    .catch(err => console.log('err : ', err))
}

const getAllCourses = (req, res) => {
  Course.find()
    .then(coursesFromDB => {
      res.status(200).json({ coursesFromDB })
    })
    .catch(err => console.log('err : ', err))
}

const getCourse = (req, res) => {
  const id = req.query.id

  Course.findById(id)
    .then(courseFromDB => {
      res.status(200).json({ courseFromDB })
    })
    .catch(err => console.log('err : ', err))
}

const upadteCourse =  (req, res, session) => {
  const id = req.body.course._id
  const updatedCourse = req.body.course

  console.log('session.user.role: ',session.user.role)
  if (session.user.role === 'USER'){
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  Course.findByIdAndUpdate(id, updatedCourse)
    .then(updatedCourseFromDB => {
      res.status(200).json({ updatedCourseFromDB })
    })
    .catch(err => console.log('err : ', err))
}

const deleteCourse = (req, res) => {
  const id = req.body

  Course.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Formation supprimer' })
    })
    .catch(err => console.log('err : ', err))
}

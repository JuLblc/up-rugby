const { connectToDatabase } = require('../../../utils/mongodb')

import User from '../../../models/User.model'
import Course from '../../../models/Course.model'

export default function handler (req, res) {
  const { method, query } = req

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
          upadteCourse(req, res)
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
  //   console.log('req: ', req)
  const { course } = req.body

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

const upadteCourse = (req, res) => {
  const id = req.body.course._id
  const updatedCourse = req.body.course

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

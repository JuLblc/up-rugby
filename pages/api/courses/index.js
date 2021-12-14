const { connectToDatabase } = require('../../../utils/mongodb');

import User from '../../../models/User.model'
import Course from '../../../models/Course.model'

export default function handler(req, res) {

    const { method } = req

    connectToDatabase()
        .then(() => {

            switch (method) {
                case 'GET':
                    res.status(200).json({ message: 'Courses API', method: method })
                    break
                case 'POST':
                    addCourse(req, res)
                    break
                case 'PUT':
                    break
                case 'DELETE':
                    break
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'La connexion à la base de donnée a échoué' });
        })

}

const addCourse = (req, res) => {

    const { course } = req.body;

    console.log('course: ', course)

    const newCourse = new Course(course)

    newCourse.save()
        .then(res=> console.log('res: ', res))
        .catch(err => console.log('back err : ', err))
}
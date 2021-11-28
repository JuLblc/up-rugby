const { connectToDatabase } = require('../../../lib/mongodb');

import User from '../../../models/User.model'

export default function handler(req, res) {

    const { method } = req

    connectToDatabase()
        .then(() => {

            switch (method) {
                case 'GET':
                    res.status(200).json({ message: 'Auth API', method: method })
                    break
                case 'POST':
                    addUser(req, res)
                    break
                case 'PUT':
                    break
                case 'DELETE':
                    break
            }
        })
        .catch(err => console.log(err))
}

const addUser = (req, res) => {

    const { email, password } = req.body;

    const aNewUser = new User({
        email,
        password
    })

    aNewUser.save()
        .then(response => {
            console.log('response', response)
            res.status(200).json(response)
        })
        .catch(err => console.log(err))

    

}
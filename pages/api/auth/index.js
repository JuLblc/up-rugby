const { connectToDatabase } = require('../../../lib/mongodb');

const bcrypt = require('bcryptjs');

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

    User.findOne({ email })
        .then(foundUser => {
            if (foundUser) {
                res.status(409).json({ message: 'Cette adresse E-mail est déjà utilisée' });
                return;
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(password, salt);

            const aNewUser = new User({
                email: email,
                password: hashPass,
            })

            aNewUser.save()
                .then(response => {
                    console.log('response', response)
                    res.status(200).json(response)
                })
                .catch(err => console.log(err))
        })
}
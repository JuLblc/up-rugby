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

    // 1. Check email and password are not empty
    if (!email || !password) {
        res.status(400).json({ message: 'Merci de saisir une adresse E-mail et un mot de passe' });
        return;
    }

    //2. Check email is valid
    const regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

    if (!regexEmail.test(email)) {
        res.status(403).json({ message: "L'adresse E-mail saisie n'est pas valide" });
        return;
    }

    //3. Check password is strong
    const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!regexPassword.test(password)) {
        res.status(403).json({ message: 'Le mot de passe doit contenir au moins 6 charactères, un chiffre et une minuscule et une majuscule' });
        return;
    }

    User.findOne({ email })
        .then(foundUser => {
            //4. Check if Email adress already used
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
        .catch(err => console.log(err))
}
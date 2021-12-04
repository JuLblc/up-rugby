const { connectToDatabase } = require('../../../utils/mongodb');

const bcrypt = require('bcryptjs');

import User from '../../../models/User.model'

export default function handler(req, res) {

    const { method } = req;
    connectToDatabase()
        .then(() => {

            switch (method) {
                case 'GET':
                    checkTokenValidity(req, res)
                    break
                case 'PUT':
                    resetPassword(req, res);
                    break
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'La connexion à la base de donnée a échoué' });
        })
}

const checkTokenValidity = (req, res) => {

    const tokenToCheck = req.query.tokenToCheck;

    console.log('tokenToCheck: ', tokenToCheck)

    if (tokenToCheck) {
        User.findOne({ token: tokenToCheck })
            .then(foundUser => {

                console.log('foundUser checkTokenValidity: ', foundUser)
                if (!foundUser) {
                    res.status(400).json({ message: 'Cette clé de validation est incorrect' , displayForm: false});
                    return
                }

                const dateNow = Date.now()
                const dateTokenExpires = Date.parse(foundUser.tokenExpires)

                if (dateNow > dateTokenExpires) {
                    res.status(200).json({ message: 'La validité de cette clé de validation a expiré', displayForm: false })
                    return
                }
                res.status(200).json({ email: foundUser.email, displayForm: true })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ message: "Ce lien n'est pas valide.", displayForm: false });
            });
    }
}

const resetPassword = (req, res) => {

    const { password, token } = req.body;

    //1. Check password is strong
    const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!regexPassword.test(password)) {
        res.status(403).json({ message: 'Le mot de passe doit contenir au moins 6 charactères, un chiffre et une minuscule et une majuscule' });
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    User.findOne({ token })
        .then(foundUser => {
            console.log('foundUser reset password: ', foundUser)

            foundUser.password = hashPass;
            foundUser.token = undefined;
            foundUser.tokenExpires = undefined;
            foundUser.isEmailVerified = true;   // handle case where user reset password because he didn't validate his email adress

            foundUser.save()
                .then(() => res.status(200).json({ message: 'Mot de passe réinitialisé avec succès', displayForm: false }))
                .catch(err => {
                    console.log(err);
                    res.status(400).json({ message: 'Erreur lors de la réinitialisation de votre mot de passe', displayForm: false });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ message: 'Erreur lors de la réinitialisation de votre mot de passe', displayForm: false });
        })
}
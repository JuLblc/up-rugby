const { connectToDatabase } = require('../../../utils/mongodb');

const bcrypt = require('bcryptjs');

import User from '../../../models/User.model'

export default function handler(req, res) {

    const { method } = req;
    connectToDatabase()
        .then(() => {
            if (method === 'PUT') {
                console.log('PUT Requsest')
                resetPassword(req, res);
            }

        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'La connexion à la base de donnée a échoué' });
        })
}

const resetPassword = (req, res) => {

    const { password, token } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    User.findOne({ token })
        .then(foundUser => {
            console.log('foundUser: ', foundUser)
            // if (!foundUser) {
            //     res.status(400).json({ message: 'Erreur' });
            //     return
            // }

            foundUser.password = hashPass;
            foundUser.token = undefined;
            foundUser.tokenExpires = undefined;

            foundUser.save()
                .then(() => res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' }))
                .catch(err => {
                    console.log(err);
                    res.status(400).json({ message: 'Erreur lors de la réinitialisation de votre mot de passe' });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ message: 'Erreur lors de la réinitialisation de votre mot de passe' });
        })
}
const { connectToDatabase } = require('../../../utils/mongodb');

const transporter = require('../../../utils/mailer');

import crypto from 'crypto'
import User from '../../../models/User.model'

export default function handler(req, res) {

    const { method } = req;
    connectToDatabase()
        .then(() => {
            if (method === 'PUT') {
                console.log('PUT Requsest')
                sendTokenToReset(req, res);
            }

        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: 'La connexion à la base de donnée a échoué' });
        })
}

const sendTokenToReset = (req, res) => {

    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: 'Merci de saisir une adresse E-mail' });
        return;
    }

    const regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

    if (!regexEmail.test(email)) {
        res.status(403).json({ message: "L'adresse E-mail saisie n'est pas valide" });
        return;
    }

    User.findOne({ email })
        .then(foundUser => {
            console.log('foundUser: ', foundUser)
            if (!foundUser) {
                res.status(400).json({ message: 'Adresse Email inconnue' });
                return
            }

            const token = crypto.randomBytes(20).toString('hex');
            const tokenExpires = Date.now() + 60 * 1000 * 60; //Token valide 1h

            foundUser.token = token;
            foundUser.tokenExpires = tokenExpires;

            foundUser.save()
                .then(() => {
                    console.log('send me email with token')

                    //Envoi email pour confirmer l'adresse
                    transporter.sendMail({
                        from: process.env.EMAIL_ADRESS,
                        to: email,
                        subject: "Réinitialisationde votre mot de passe",
                        html: `
                        Bonjour ${foundUser.email},</br>
                        nous avons reçu une demande de réinitialisation de votre mot de passe.</br>
                        Le lien suivant est valide 1 heure, cliquez pour redéfinir votre mot de passe.</br>
                        <a href=${process.env.DOMAIN_URL}/reset-password/${foundUser.token}>Réinitialiser mon mot de passe</a></br>
                        Si vous n'êtes pas à l'origine de cette demande, merci d'ignorer cet E-mail.`
                    })
                        .then(() => res.status(200).json({ message: 'Un E-mail vous a été envoyé.' }))
                        .catch(err => {
                            res.status(400).json({ message: "Une erreur lors de l'envoi du mail de récupération s'est produite." });
                        })
                })
                .catch(err => {
                    res.status(400).json({ message: "Une erreur lors de la réinitialisation de votre mot de passe s'est produite." });
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ message: "Une erreur lors de la réinitialisation de votre mot de passe s'est produite." });
        })
}
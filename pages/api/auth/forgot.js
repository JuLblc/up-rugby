const { connectToDatabase } = require("../../../utils/mongodb");

const transporter = require("../../../utils/mailer");

import crypto from "crypto";
import User from "../../../models/User.model";

export default function handler(req, res) {
  const { method } = req;

  connectToDatabase()
    .then(() => {
      if (method === "PUT") {
        console.log("PUT Requsest");
        sendTokenToReset(req, res);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "La connexion à la base de donnée a échoué" });
    });
}

const sendTokenToReset = (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      message: "Merci de saisir une adresse E-mail",
      messageType: "error",
    });

    return;
  }

  // eslint-disable-next-line security/detect-unsafe-regex, no-useless-escape
  const regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

  if (!regexEmail.test(email)) {
    res.status(403).json({
      message: "L'adresse E-mail saisie n'est pas valide",
      messageType: "error",
    });

    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(400).json({
          message: "Adresse Email inconnue",
          messageType: "error",
        });

        return;
      }

      const token = crypto.randomBytes(20).toString("hex");
      const tokenExpires = Date.now() + 60 * 1000 * 60; //Token valide 1h

      foundUser.token = token;
      foundUser.tokenExpires = tokenExpires;

      foundUser
        .save()
        .then(() => {
          //Envoi email pour confirmer l'adresse
          transporter
            .sendMail({
              from: process.env.EMAIL_ADRESS,
              html: `
                        Bonjour ${foundUser.email},</br>
                        nous avons reçu une demande de réinitialisation de votre mot de passe.</br>
                        Le lien suivant est valide 1 heure, cliquez pour redéfinir votre mot de passe.</br>
                        <a href=${process.env.DOMAIN_URL}/reset-password/${foundUser.token}>Réinitialiser mon mot de passe</a></br>
                        Si vous n'êtes pas à l'origine de cette demande, merci d'ignorer cet E-mail.`,
              subject: "Réinitialisationde votre mot de passe",
              to: email,
            })
            .then(() =>
              res.status(200).json({
                message: "Un E-mail vous a été envoyé.",
                messageType: "success",
              })
            )
            .catch((err) => {
              res.status(400).json({
                message:
                  "Une erreur lors de l'envoi du mail de récupération s'est produite.",
                messageType: "error",
              });
              console.log(err);
            });
        })
        .catch((err) => {
          res.status(400).json({
            message:
              "Une erreur lors de la réinitialisation de votre mot de passe s'est produite.",
            messageType: "error",
          });
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message:
          "Une erreur lors de la réinitialisation de votre mot de passe s'est produite.",
        messageType: "error",
      });
    });
};

const { connectToDatabase } = require("../../../utils/mongodb");

const bcrypt = require("bcryptjs");
const transporter = require("../../../utils/mailer");

import crypto from "crypto";
import User from "../../../models/User.model";

export default function handler(req, res) {
  const { method } = req;

  connectToDatabase()
    .then(() => {
      switch (method) {
        case "GET":
          res.status(200).json({ message: "Auth API", method });
          break;
        case "POST":
          addUser(req, res);
          break;
        case "PUT":
          break;
        case "DELETE":
          break;
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "La connexion à la base de donnée a échoué" });
    });
}

const addUser = (req, res) => {
  const { email, password } = req.body;

  // 1. Check email and password are not empty
  if (!email || !password) {
    res.status(400).json({
      message: "Merci de saisir une adresse E-mail et un mot de passe",
      messageType: "error",
    });

    return;
  }

  //2. Check email is valid
  // eslint-disable-next-line security/detect-unsafe-regex, no-useless-escape
  const regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

  if (!regexEmail.test(email)) {
    res.status(403).json({
      message: "L'adresse E-mail saisie n'est pas valide",
      messageType: "error",
    });

    return;
  }

  //3. Check password is strong
  const regexPassword =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

  if (!regexPassword.test(password)) {
    res.status(403).json({
      message:
        "Le mot de passe doit contenir au moins 6 caractères, un chiffre, une lettre et un caractère spécial",
      messageType: "error",
    });

    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      //4. Check if Email adress already used
      if (foundUser) {
        res.status(409).json({
          message: "Cette adresse E-mail est déjà utilisée",
          messageType: "error",
        });

        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      const token = crypto.randomBytes(20).toString("hex");
      const tokenExpires = Date.now() + 60 * 1000 * 60; //Token valide 1h

      const aNewUser = new User({
        email,
        password: hashPass,
        token,
        tokenExpires,
      });

      aNewUser
        .save()
        .then(() => {
          //Envoi email pour confirmer l'adresse
          transporter
            .sendMail({
              from: process.env.EMAIL_ADRESS,
              html: `
                Bienvenue ${aNewUser.email},</br>
                cliquez sur le lien suivant pour valider votre adresse E-Mail</br>
                <a href=${process.env.DOMAIN_URL}/verify/${token}> Valider </a></br>
                Merci`,
              subject: "Validation de votre adresse E-mail",
              to: email,
            })
            .then(() =>
              res.status(200).json({
                message:
                  "Un E-mail pour valider votre adresse vous a été envoyé.",
                messageType: "success",
              })
            )
            .catch((err) => {
              res.status(400).json({
                message:
                  "Une erreur lors de l'envoi du mail de validation s'est produite.",
                messageType: "error",
              });
              console.log(err);
            });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Une erreur lors de la création du compte s'est produite.",
            messageType: "error",
          });
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Une erreur lors de la création du compte s'est produite.",
        messageType: "error",
      });
      console.log(err);
    });
};

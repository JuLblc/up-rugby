const { connectToDatabase } = require("../../../utils/mongodb");

import User from "../../../models/User.model";

export default function handler(req, res) {
  connectToDatabase()
    .then(() => {
      verifyToken(req, res);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "La connexion à la base de donnée a échoué" });
    });
}

const verifyToken = (req, res) => {
  const { tokenToCheck } = req.query;

  User.findOne({ token: tokenToCheck })
    .then((foundUser) => {
      // console.log('foundUser: ', foundUser)
      if (!foundUser) {
        res
          .status(400)
          .json({ message: "Cette clé de validation est incorrect" });

        return;
      }

      foundUser.isEmailVerified = true;
      foundUser.token = undefined;
      foundUser.tokenExpires = undefined;

      foundUser
        .save()
        .then(() => res.status(200).json({ message: "Adresse Email validée." }))
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ message: "Erreur lors de la validation de votre Email" });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "Erreur lors de la validation de votre Email" });
    });
};

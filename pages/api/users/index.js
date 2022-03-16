import User from "../../../models/User.model";
import { getSession } from "next-auth/react";

const { connectToDatabase } = require("../../../utils/mongodb");

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { method } = req;

  connectToDatabase()
    .then(() => {
      switch (method) {
        case "GET":
          getUser(req, res, session);
          break;
        case "PUT":
          updateUser(req, res, session);
          break;
        default:
          console.log("switch default");
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "La connexion à la base de donnée a échoué" });
    });
}

const getUser = (req, res, session) => {
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const cond = { _id: session.user.id };

  User.findOne(cond)
    .then((userFromDB) => {
      res.status(200).json({ userFromDB });
    })
    .catch((err) => console.log("err : ", err));
};

const updateUser = (req, res, session) => {
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userUpdate = req.body.updatedUser;

  User.findByIdAndUpdate(userUpdate._id, userUpdate, { new: true })
    .then((updatedUserFromDB) => {
      res.status(201).json({ updatedUserFromDB });
    })
    .catch((err) => console.log("err : ", err));
};

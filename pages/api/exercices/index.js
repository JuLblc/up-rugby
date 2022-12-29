import Exercice from "../../../models/Exercice.model";

import { getSession } from "next-auth/react";

const { connectToDatabase } = require("../../../utils/mongodb");

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { method, query } = req;

  connectToDatabase()
    .then(() => {
      switch (method) {
        case "GET":
          if (!query.url) {
            getAllExercices(req, res, session);
            break;
          }
          getExercice(req, res, session);
          break;
        case "POST":
          addExercice(req, res, session);
          break;
        case "PUT":
          updateExercice(req, res, session);
          break;
        case "DELETE":
          deleteExercice(req, res, session);
          break;

        default:
          res.status(405).end("Method not allowed");
      }
    })
    .catch((err) => {
      console.log("ERR: ", err);
      res
        .status(400)
        .json({ message: "La connexion à la base de donnée a échoué" });
    });
}

const getAllExercices = (req, res, session) => {
  const cond = {};

  if (!session || session.user.role !== "ADMIN") {
    cond.isPublished = true;
  }

  Exercice.find(cond)
    .sort({ _id: -1 }) //sort collection in descending order based on the date of insertion
    .then((exercicesFromDB) => {
      res.status(200).json({ exercicesFromDB });
    })
    .catch((err) => console.log("err : ", err));
};

const getExercice = (req, res, session) => {
  const seoUrl = req.query.url;
  const cond = { seoUrl };

  if (!session || session.user.role !== "ADMIN") {
    cond.isPublished = true;
  }

  Exercice.find(cond)
    .then((exerciceFromDB) => {
      res.status(200).json({ exerciceFromDB: exerciceFromDB[0] });
    })
    .catch((err) => console.log("err : ", err));
};

const addExercice = (req, res, session) => {
  const { exercice } = req.body;

  if (!session || session.user.role !== "ADMIN") {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const newExercice = new Exercice(exercice);

  newExercice
    .save()
    .then((newExerciceFromDB) => {
      res.status(200).json({ newExerciceFromDB });
    })
    .catch((err) => console.log("err : ", err));
};

const updateExercice = (req, res, session) => {
  if (!session || session.user.role !== "ADMIN") {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const id = req.body.exercice._id;
  const updatedExercice = req.body.exercice;

  Exercice.findByIdAndUpdate(id, updatedExercice, { new: true })
    .then((updatedExerciceFromDB) => {
      res.status(200).json({ updatedExerciceFromDB });
    })
    .catch((err) => console.log("err : ", err));
};

const deleteExercice = (req, res, session) => {
  if (!session || session.user.role !== "ADMIN") {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const id = req.body;

  Exercice.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Exercice supprimé" });
    })
    .catch((err) => console.log("err : ", err));
};

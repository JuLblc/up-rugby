import Exercice from "../../../models/Exercice.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";
import { UserRole } from "../../../constants";

type CourseFilter = {
  isPublished?: boolean;
  seoUrl?: string | string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
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
    .catch((err: Error) => {
      console.error("err : ", err);
      res
        .status(400)
        .json({ message: "La connexion à la base de donnée a échoué" });
    });
}

const getAllExercices = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { role: UserRole } }
) => {
  const filter: CourseFilter = {};

  if (!session || session.user.role !== UserRole.ADMIN) {
    filter.isPublished = true;
  }

  Exercice.find(filter)
    .sort({ _id: -1 }) //sort collection in descending order based on the date of insertion
    .then((exercicesFromDB) => {
      res.status(200).json({ exercicesFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const getExercice = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { role: UserRole } }
) => {
  const seoUrl = req.query.url;
  const filter: CourseFilter = { seoUrl };

  if (!session || session.user.role !== UserRole.ADMIN) {
    filter.isPublished = true;
  }

  Exercice.find(filter)
    .then((exerciceFromDB) => {
      res.status(200).json({ exerciceFromDB: exerciceFromDB[0] });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const addExercice = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { role: UserRole } }
) => {
  const { exercice } = req.body;

  if (!session || session.user.role !== UserRole.ADMIN) {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const newExercice = new Exercice(exercice);

  newExercice
    .save()
    .then((newExerciceFromDB) => {
      res.status(200).json({ newExerciceFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const updateExercice = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { role: UserRole } }
) => {
  if (!session || session.user.role !== UserRole.ADMIN) {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const id = req.body.exercice._id;
  const updatedExercice = req.body.exercice;

  Exercice.findByIdAndUpdate(id, updatedExercice, { new: true })
    .then((updatedExerciceFromDB) => {
      res.status(200).json({ updatedExerciceFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const deleteExercice = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { role: UserRole } }
) => {
  if (!session || session.user.role !== UserRole.ADMIN) {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const id = req.body;

  Exercice.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Exercice supprimé" });
    })
    .catch((err: Error) => console.error("err : ", err));
};

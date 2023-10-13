import Course from "../../../models/Course.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const { method } = req;

  connectToDatabase()
    .then(() => {
      switch (method) {
        case "PUT":
          addCommentToCourse(req, res, session);
          break;

        default:
          res.status(405).end("Method not allowed");
      }
    })
    .catch((err: Error) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "La connexion à la base de donnée a échoué" });
    });
}

const addCommentToCourse = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: any
) => {
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const id = req.body.course._id;
  const updatedCourse = req.body.course;

  Course.findByIdAndUpdate(id, updatedCourse, { new: true })
    .then((updatedCourseFromDB) => {
      res.status(200).json({ updatedCourseFromDB });
    })
    .catch((err) => console.log("err : ", err));
};

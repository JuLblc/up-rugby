import User from "../../../models/User.model";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
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
          addCourseToUser(req, res, session);
          break;

        default:
          res.status(405).end("Method not allowed");
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "La connexion à la base de donnée a échoué" });
    });
}

const addCourseToUser = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { id: string } }
) => {
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const { courseId } = req.body;

  User.findById(session.user.id)
    .then((foundUser) => {
      // Check if course already in purchasedCourses
      if (foundUser.purchasedCourses.indexOf(courseId) === -1) {
        foundUser.purchasedCourses.push(courseId);

        foundUser
          .save()
          .then((updatedUser) => {
            res.status(201).json({ updatedUser });
          })
          .catch((err: Error) => console.error("err : ", err));

        return;
      }

      res.status(400).json({ message: "Cette formation a déjà été acheté" });
    })
    .catch((err: Error) => console.error("err : ", err));
};

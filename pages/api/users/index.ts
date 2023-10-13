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
        case "GET":
          getUser(req, res, session);
          break;
        case "PUT":
          updateUser(req, res, session);
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

const getUser = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: { user: { id: string } }
) => {
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const cond = { _id: session.user.id };

  User.findOne(cond)
    .then((userFromDB) => {
      res.status(200).json({ userFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const updateUser = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: any
) => {
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const userUpdate = req.body.updatedUser;

  User.findByIdAndUpdate(userUpdate._id, userUpdate, { new: true })
    .then((updatedUserFromDB) => {
      res.status(201).json({ updatedUserFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

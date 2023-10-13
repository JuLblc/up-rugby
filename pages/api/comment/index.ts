import Comment from "../../../models/Comment.model";
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
        case "POST":
          if (req.body.comment) {
            addComment(req, res, session);
          } else if (req.body.reply) {
            addReply(req, res, session);
          }
          break;
        case "GET":
          getComment(req, res);
          break;
      }
    })
    .catch((err: Error) => {
      console.error("err : ", err);
      res
        .status(400)
        .json({ message: "La connexion à la base de donnée a échoué" });
    });
}

const addComment = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: any
) => {
  const { comment } = req.body;

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  const newComment = new Comment(comment);

  newComment
    .save()
    .then((newCommentFromDB) => {
      res.status(200).json({ newCommentFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const getComment = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  Comment.findById(id)
    .then((commentFromDB) => {
      res.status(200).json({ commentFromDB });
    })
    .catch((err: Error) => console.error("err : ", err));
};

const addReply = (req: NextApiRequest, res: NextApiResponse, session: any) => {
  const { id, reply } = req.body;

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });

    return;
  }

  Comment.findById(id)
    .then((commentFromDB) => {
      commentFromDB.replies.push(reply);
      commentFromDB
        .save()
        .then((newCommentFromDB) => {
          res.status(200).json({ newCommentFromDB });
        })
        .catch((err: Error) => console.error("err : ", err));
    })
    .catch((err: Error) => console.error("err : ", err));
};

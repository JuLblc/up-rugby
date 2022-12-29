const { connectToDatabase } = require("../../../utils/mongodb");

import Comment from "../../../models/Comment.model";

import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
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
          getComment(req, res, session);
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

const addComment = (req, res, session) => {
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
    .catch((err) => console.log("err : ", err));
};

const getComment = (req, res) => {
  const { id } = req.query;

  Comment.findById(id)
    .then((commentFromDB) => {
      res.status(200).json({ commentFromDB });
    })
    .catch((err) => console.log("err : ", err));
};

const addReply = (req, res) => {
  const { id, reply } = req.body;

  Comment.findById(id)
    .then((commentFromDB) => {
      commentFromDB.replies.push(reply);
      commentFromDB
        .save()
        .then((newCommentFromDB) => {
          res.status(200).json({ newCommentFromDB });
        })
        .catch((err) => console.log("err : ", err));
    })
    .catch((err) => console.log("err : ", err));
};

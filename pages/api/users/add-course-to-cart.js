import User from "../../../models/User.model";
import { getSession } from "next-auth/react";

const { connectToDatabase } = require("../../../utils/mongodb");

export default async function handler(req, res) {
    const session = await getSession({ req });
    const { method } = req;

    connectToDatabase()
    .then(() => {
      switch (method) {
        case "PUT":
          addCourseToCart(req, res, session);
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

const addCourseToCart = (req, res, session) => {
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  
    const { courseId } = req.body;
  
    User.findById(session.user.id)
      .then((foundUser) => {
        // Check if course already in cart
        if (foundUser.cart.indexOf(courseId) === -1) {
          foundUser.cart.push(courseId);
  
          foundUser
            .save()
            .then((updatedUser) => {
              res.status(201).json({ updatedUser });
            })
            .catch((err) => console.log("err : ", err));
  
          return;
        }
  
        res.status(400).json({ message: "Cette formation a déjà été ajouté au panier" });
      })
      .catch((err) => console.log("err : ", err));
  };
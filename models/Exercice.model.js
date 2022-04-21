import mongoose from "mongoose";

const ExerciceSchema = new mongoose.Schema({
  category: String, //Attraper-passer
  description: String,
  seoUrl: String,
  img: {
    fileName: String,
    url: String,
    width: Number,
    height: Number
  },
  exercices: [
    {
      chapter: String, //préhension pour la passe au rugby
      url: String
    }
  ],
  isPublished: {
    type: Boolean,
    default: false
  }
});

module.exports =
  mongoose.models.Exercice || mongoose.model("Exercice", ExerciceSchema);

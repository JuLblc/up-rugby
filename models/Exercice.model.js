import mongoose from "mongoose";

const ExerciceSchema = new mongoose.Schema({
  title: String, //Circulation offensive
  description: String,
  seoUrl: String,
  img: {
    fileName: String,
    url: String,
    width: Number,
    height: Number
  },
  chapters: [
    {
      title: String, //Joueur en avance
      lectures: [{
        url: String,
        duration: Number,
      }]
    }
  ],
  isPublished: {
    type: Boolean,
    default: false
  }
});

module.exports =
  mongoose.models.Exercice || mongoose.model("Exercice", ExerciceSchema);

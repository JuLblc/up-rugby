import mongoose from "mongoose";

const ExerciceSchema = new mongoose.Schema({
  title: String, //Attraper-passer
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
      title: String, //préhension pour la passe au rugby
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

import mongoose from "mongoose";

const ExerciceSchema = new mongoose.Schema({
  // Level 1
  title: String, //Circulation offensive
  description: String,
  seoUrl: String,
  img: {
    fileName: String,
    url: String,
    width: Number,
    height: Number
  },
  // Level 2
  chapters: [
    {
      title: String, //Joueur en avance
      lectures: [
        {
          url: String,
          duration: Number,
          youtubeId: String
        }
      ],
      // Level 3
      subchapters: [
        {
          title: String, //La gestion du surnombre
          lectures: [
            {
              url: String,
              duration: Number,
              youtubeId: String
            }
          ],
          // Level 4
          infrachapters: [
            {
              title: String, //2vs1
              lectures: [
                {
                  url: String,
                  duration: Number,
                  youtubeId: String
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  isPublished: {
    type: Boolean,
    default: false
  }
});

module.exports =
  mongoose.models.Exercice || mongoose.model("Exercice", ExerciceSchema);

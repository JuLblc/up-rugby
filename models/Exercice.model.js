/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable sort-keys */
import mongoose from "mongoose";

const ExerciceSchema = new mongoose.Schema({
  // Level 1
  title: String, //Circulation offensive
  description: String,
  seoUrl: String,
  img: {
    fileName: String,
    height: Number,
    url: String,
    width: Number,
  },
  // Level 2
  chapters: [
    {
      title: String, //Joueur en avance
      lectures: [
        {
          duration: Number,
          url: String,
          youtubeId: String,
        },
      ],
      // Level 3
      subchapters: [
        {
          title: String, //La gestion du surnombre
          lectures: [
            {
              duration: Number,
              url: String,
              youtubeId: String,
            },
          ],
          // Level 4
          infrachapters: [
            {
              title: String, //2vs1
              lectures: [
                {
                  duration: Number,
                  url: String,
                  youtubeId: String,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  isPublished: {
    default: false,
    type: Boolean,
  },
});

module.exports =
  mongoose.models.Exercice || mongoose.model("Exercice", ExerciceSchema);

import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  attachements: [
    {
      fileName: String,
      url: String,
    },
  ],
  category: String,
  chapters: [
    {
      lectures: [
        {
          comments: [
            {
              ref: "Comment",
              type: mongoose.Schema.Types.ObjectId,
            },
          ],
          description: String,
          duration: Number,
          seoUrl: String,
          title: String,
          url: String,
        },
      ],
      seoUrl: String,
      title: String,
    },
  ],
  description: String,
  img: {
    fileName: String,
    height: Number,
    url: String,
    width: Number,
  },
  isPublished: {
    default: false,
    type: Boolean,
  },
  overview: String,
  price: Number,
  seoUrl: String,
  title: String,
});

module.exports =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);

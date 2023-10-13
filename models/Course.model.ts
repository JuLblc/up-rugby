import mongoose, { Schema, Document, Model } from "mongoose";

type Attachment = {
  fileName: string;
  url: string;
};

type Lecture = {
  comments: mongoose.Schema.Types.ObjectId[];
  description: string;
  duration: number;
  seoUrl: string;
  title: string;
  url: string;
};

type Chapter = {
  lectures: Lecture[];
  seoUrl: string;
  title: string;
};

type Image = {
  fileName: string;
  height: number;
  url: string;
  width: number;
};

type Course = Document & {
  attachments: Attachment[];
  category: string;
  chapters: Chapter[];
  description: string;
  img: Image;
  isPublished: boolean;
  overview: string;
  price: number;
  seoUrl: string;
  title: string;
};

const CourseSchema: Schema = new mongoose.Schema({
  attachments: [
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

const Course: Model<Course> =
  mongoose.models.Course || mongoose.model<Course>("Course", CourseSchema);

export default Course;

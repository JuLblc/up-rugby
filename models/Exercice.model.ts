/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable sort-keys */
import mongoose, { Schema, Document, Model } from "mongoose";

type Lecture = {
  duration: number;
  url: string;
  youtubeId: string;
};

type Infrachapter = {
  lectures: Lecture[];
  title: string;
};

type Subchapter = {
  infrachapters: Infrachapter[];
  lectures: Lecture[];
  title: string;
};

type Chapter = {
  lectures: Lecture[];
  subchapters: Subchapter[];
  title: string;
};

type Image = {
  fileName: string;
  height: number;
  url: string;
  width: number;
};

type Exercice = Document & {
  chapters: Chapter[];
  description: string;
  img: Image;
  isPublished: boolean;
  seoUrl: string;
  title: string;
};

const LectureSchema: Schema = new mongoose.Schema({
  duration: Number,
  url: String,
  youtubeId: String,
});

const InfrachapterSchema: Schema = new mongoose.Schema({
  title: String,
  lectures: [LectureSchema],
});

const SubchapterSchema: Schema = new mongoose.Schema({
  title: String,
  lectures: [LectureSchema],
  infrachapters: [InfrachapterSchema],
});

const ChapterSchema: Schema = new mongoose.Schema({
  title: String,
  lectures: [LectureSchema],
  subchapters: [SubchapterSchema],
});

const ImageSchema: Schema = new mongoose.Schema({
  fileName: String,
  height: Number,
  url: String,
  width: Number,
});

const ExerciceSchema: Schema = new mongoose.Schema({
  title: String,
  description: String,
  seoUrl: String,
  img: ImageSchema,
  chapters: [ChapterSchema],
  isPublished: {
    default: false,
    type: Boolean,
  },
});

const Exercice: Model<Exercice> =
  mongoose.models.Exercice ||
  mongoose.model<Exercice>("Exercice", ExerciceSchema);

export default Exercice;

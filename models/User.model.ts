import mongoose, { Schema, Document, Model } from "mongoose";

type Course = mongoose.Schema.Types.ObjectId;

type User = Document & {
  cart: Course[];
  category: "Joueur" | "Entraineur";
  club: string;
  email: string;
  facebookID: string;
  firstName: string;
  googleID: string;
  isEmailVerified: boolean;
  lastName: string;
  password: string;
  purchasedCourses: Course[];
  role: "USER" | "ADMIN";
  token: string;
  tokenExpires: Date;
};

const UserSchema: Schema = new mongoose.Schema({
  cart: [
    {
      ref: "Course",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  category: {
    enum: ["Joueur", "Entraineur"],
    type: String,
  },
  club: String,
  email: {
    index: true,
    lowercase: true,
    sparse: true,
    type: String,
    unique: true,
  },
  facebookID: String,
  firstName: String,
  googleID: String,
  isEmailVerified: {
    default: false,
    type: Boolean,
  },
  lastName: String,
  password: String,
  purchasedCourses: [
    {
      ref: "Course",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  role: {
    default: "USER",
    enum: ["USER", "ADMIN"],
    type: String,
  },
  token: String,
  tokenExpires: Date,
});

const User: Model<User> =
  mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default User;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
  // unique index sparse => allowed several email === null
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

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

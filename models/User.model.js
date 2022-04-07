import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  // unique index sparse => allowed several email === null
  email: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
    sparse: true
  },
  password: String,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  token: String,
  tokenExpires: Date,
  facebookID: String,
  googleID: String,
  firstName: String,
  lastName: String,
  club: String,
  category:{
    type: String,
    enum: ['Joueur', 'Entraineur'],
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)

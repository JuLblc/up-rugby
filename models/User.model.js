import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  token: String,
  tokenExpires:Date,
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // unique index sparse => allowed several email === null
  email: {
    type: String,
    unique:true,
    index:true, 
    lowercase: true,
    sparse:true,
  },
  password: String,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  token: String,
  tokenExpires:Date,
  facebookID:String,
  googleID:String,
  firstName:String,
  lastName:String,
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
  
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
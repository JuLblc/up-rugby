import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: String,
  date: { type: Date, default: Date.now }
})

module.exports =
  mongoose.models.Comment || mongoose.model('Comment', CommentSchema)
import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  authorname: String,
  comment: String,
  date: { type: Date, default: Date.now },
  replies: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      authorname: String,
      comment: String,
      date: { type: Date, default: Date.now }
    }
  ]
})

module.exports =
  mongoose.models.Comment || mongoose.model('Comment', CommentSchema)

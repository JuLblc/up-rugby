import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  authorname: String,
  comment: String,
  date: { default: Date.now, type: Date },
  replies: [
    {
      author: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
      },
      authorname: String,
      comment: String,
      date: { default: Date.now, type: Date },
    },
  ],
});

module.exports =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

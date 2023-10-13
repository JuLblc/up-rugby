import mongoose, { Schema, Model } from "mongoose";

type Reply = {
  author: mongoose.Schema.Types.ObjectId;
  authorname: string;
  comment: string;
  date: Date;
};

type Comment = {
  author: mongoose.Schema.Types.ObjectId;
  authorname: string;
  comment: string;
  date: Date;
  replies: Reply[];
};

const ReplySchema: Schema = new mongoose.Schema({
  author: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  authorname: String,
  comment: String,
  date: { default: Date.now, type: Date },
});

const CommentSchema: Schema = new mongoose.Schema({
  author: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
  authorname: String,
  comment: String,
  date: { default: Date.now, type: Date },
  replies: [ReplySchema],
});

const Comment: Model<Comment> =
  mongoose.models.Comment || mongoose.model<Comment>("Comment", CommentSchema);

export default Comment;

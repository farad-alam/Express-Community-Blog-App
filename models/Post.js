const { Schema, model } = require("mongoose");

// author, title, thumbnail, body, readtimes, tags, likes, dislikes, comments
const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    thumbnail: {
      type: String,
    },
    body: {
      type: String,
      required: true,
      maxlength: 5000
    },
    tags: {
      type: [String],
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    readTime: String,
    comments: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post;

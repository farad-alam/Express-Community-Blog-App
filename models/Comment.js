const { Schema, model } = require("mongoose");

// post, user, body, replies

const commnetSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300,
  },
  replies: [
    {
      body: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt : {
        type : Date,
        default : new Date()
      }
    },
  ],
}, {timestamps : true});

const Comment = model("Comment", commnetSchema);

module.exports = Comment;
const { Schema, model } = require("mongoose");

// user, Name, title, bio, profile pic, Links, likes, posts bookmarks

const profileSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 40,
    },
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 70,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    profilePic: {
      type: String,
    },
    links: {
      website: String,
      facebook: String,
      twitter: String,
      linkedin: String,
      github: String,
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const Profile = model("Profile", profileSchema);

module.exports = Profile;

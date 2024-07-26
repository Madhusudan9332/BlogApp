const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  commentTo: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  comments: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
},
{
    timestamps : true,
});

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;

const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
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
  timestamps: true,
});

const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;

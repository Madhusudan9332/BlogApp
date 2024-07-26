const CommentModel = require("../model/comment");
const blogModel = require("../model/blogs");

const createComment = async (req, res) => {
  try {
    const isValidCommentTo = (await blogModel.findById(req.body.commentTo)) ||
      (await CommentModel.findByIdAndUpdate(req.body.commentTo));
    if(!isValidCommentTo) throw new Error("Comment To not Found")
    const Comment = req.body;
    Comment.author = req.user._id;
    const postComment = await CommentModel.create(Comment);
    (await blogModel.findByIdAndUpdate(req.body.commentTo, {
      $push: { comments: postComment._id },
    })) ||
      (await CommentModel.findByIdAndUpdate(req.body.commentTo, {
        $push: { comments: postComment._id },
      }));

    res.status(201).json({
      status: "success",
      message: "Comment created successfully",
      data: postComment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to create Comment",
      message: err.message,
    });
  }
};

const readComment = async (req, res) => {
  try {
    const Comment = await CommentModel.findById(req.params.id);
    if (!Comment) throw new Error("Comment not found check Comment-id");
    res.status(200).json({
      status: "success",
      message: "Comment read successfully",
      data: Comment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to read Comment",
      message: err.message,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const Comment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!Comment) throw new Error("Comment not found check Comment-id");
    if (Comment.author.toString() !== req.user._id.toString())
      throw new Error("You are not authorized to update this Comment");
    res.status(200).json({
      status: "success",
      message: "Comment updated successfully",
      data: Comment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to update Comment",
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const Comment = await CommentModel.findByIdAndDelete(req.params.id);
    if (!Comment) throw new Error("Comment not found check Comment-id");
    if (Comment.author.toString() !== req.user._id.toString())
      throw new Error("You are not authorized to delete this Comment");
    res.status(200).json({
      status: "success",
      message: "Comment deleted successfully",
      deleted_data: Comment,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to delete Comment",
      message: err.message,
    });
  }
};

const CommentController = {
  createComment,
  readComment,
  updateComment,
  deleteComment,
};

module.exports = CommentController;

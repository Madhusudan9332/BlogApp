const blogModel = require("../model/blogs");

const createBlog = async (req, res) => {
  try {
    const blog = req.body;
    blog.author = req.user._id;
    console.log(blog);
    await blogModel.create(blog);
    res.status(201).json({
      status: "success",
      message: "blog created successfully",
      data: blog,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to create blog",
      message: err.message,
    });
  }
};

const readAllBlogs = async (req, res) => {
  try {
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;
    const blogs = (await blogModel.find().skip(skip).limit(limit)) || [];
    res.status(200).json({
      status: "success",
      message: "All blogs read successfully",
      data: blogs,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to read all blogs",
      message: err.message,
    });
  }
};

const readBlog = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) throw new Error("Blog not found check blog-id");
    res.status(200).json({
      status: "success",
      message: "Blog read successfully",
      data: blog,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to read blog",
      message: err.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndUpdate(req.params.id, req.body);
    if (!blog) throw new Error("Blog not found check blog-id");
    if (blog.author.toString() !== req.user._id.toString())
      throw new Error("You are not authorized to update this blog");
    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to update blog",
      message: err.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id);
    if (!blog) throw new Error("Blog not found check blog-id");
    if (blog.author.toString() !== req.user._id.toString())
      throw new Error("You are not authorized to delete this blog");
    res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
      deleted_data: blog,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail to delete blog",
      message: err.message,
    });
  }
};

const blogController = {
  createBlog,
  readAllBlogs,
  readBlog,
  updateBlog,
  deleteBlog,
};

module.exports = blogController;

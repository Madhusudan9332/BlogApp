const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require('./route/user')
const blogRouter = require('./route/blog')
const commentRouter = require('./route/comment')


dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("Error in DB connection", err));

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(blogRouter);
app.use(commentRouter);


app.listen(process.env.PORT);

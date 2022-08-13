const cors = require("cors");
const express = require("express");
const multer = require("multer");
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/users.routes");
const postRouter = require("./routes/posts.routes");
const followerRouter = require("./routes/followers.routes");
const reactionRouter = require("./routes/reaction.routes");
const notificationRouter = require("./routes/notifications.route");
const authRouter = require("./routes/auth.routes");

//config app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get("/ping", (req, res) => {
  res.status(200).send({ message: 'Server is Working' });
})
app.use("/", authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use("/followers", followerRouter);
app.use("/reaction", reactionRouter);
app.use("/notification", notificationRouter);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
})
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    status: errorStatus,
    err: errorMessage,
  });
});

module.exports = app;
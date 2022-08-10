const cors = require("cors");
const express = require("express");
const multer = require("multer");
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/users.routes");
const postRouter = require("./routes/posts.routes");
const followerRouter = require("./routes/followers.routes");
const reactionRouter = require("./routes/reaction.routes");
const notificationRouter = require("./routes/notifications.route");

//config app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.get("/ping", (req, res) => {
  res.status(200).send({ message: 'Server is Working' });
})

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use("/followers", followerRouter);
app.use("/reaction", reactionRouter);
app.use("/notification", notificationRouter);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
})

module.exports = app;
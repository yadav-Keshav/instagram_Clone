const cors = require("cors");
const express = require("express");
const userRouter = require("./routes/users.routes");
const postRouter = require("./routes/posts.routes");
const authRouter = require("./routes/auth.routes");

//config app
const app = express();
app.use(express.json());
app.use(cors());

//api endPoint
app.get("/ping", (req, res) => {
  res.status(200).send({ message: 'Server is Working' });
})
app.use("/auth", authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
})

// middleware for handling error
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.log(errorMessage);
  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
  });
});

module.exports = app;
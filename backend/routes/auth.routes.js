const express = require('express');
const { login, register, verifyEmail, forgotPassword, resetPassword } = require('../controllers/auth.controllers');

const authRouter = express.Router();
authRouter.post("/login", login);
authRouter.post("/create", register);
authRouter.get("/confirm_email/:token", verifyEmail);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
module.exports = authRouter;
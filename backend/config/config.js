const dotenv=require('dotenv');
dotenv.config();

exports.DB_URI=process.env.DB_URI;
exports.SECRET=process.env.SECRET;
exports.PASSWORD=process.env.PASSWORD;
exports.EMAIL=process.env.EMAIL;
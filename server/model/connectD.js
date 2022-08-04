const mongoose = require('mongoose');
const DB_URI=process.env.DB_URI;
module.exports = () => {
    mongoose.connect(DB_URI)
        .then((db) => { console.log(`sucefully Connected: ${db.connection.host}`) })
        .catch((err) => { console.log(err.message) })
}
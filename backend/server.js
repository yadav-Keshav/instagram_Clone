const app = require('./app');
const connectDB = require('./config/connectDb');


// Handling uncaught Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
})


//Connecting to Database
connectDB();

if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`Server is Listening on PORT : ${PORT}`);

});


//Handling Unhandled Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Server is Closed Due to ${err.message}`);
    server.close();
    process.exit(1);
})
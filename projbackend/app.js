require("dotenv").config();

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const { cookie } = require("express-validor");
const authRoutes = require("./routes/authentication.js");

//DB CONNECT
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {
    console.log("DB CONNECTED")
});

// MIDDLEWARE
app.use(bodyParser.json()); //body parser application json.
app.use(cookieParser());
app.use(cors());

//ROUTES
app.use("/api", authRoutes);

// PORT
const port = 8000;

// STARTING A SERVER
app.listen(port, () => {
    console.log(`app is running at ${port}`)

});
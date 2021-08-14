require('dotenv').config();

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const { cookie } = require("express-validor");

//my routes import
const authRoutes = require("./routes/authentication.js");
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')




//DB CONNECT
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {
    console.log("DB CONNECTED")
});

// 3rd MIDDLEWARE
app.use(bodyParser.json()); //body parser application json.
app.use(cookieParser());
app.use(cors());

//My ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);




// PORT
const port = 4000;

// STARTING A SERVER
app.listen(port, () => {
    console.log(`app is running at ${port}`)

});
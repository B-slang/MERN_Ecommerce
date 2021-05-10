var express = require('express')
var router = express.Router()

const {signout, signup} = require("../controllers/authentication")

router.post("/signup", signup);

router.get("/signout", signout);

module.exports = router;
var express = require('express')
var router = express.Router()

const signout =  (req, res) => {
    res.send("user signout")

};

router.get("/signout", signout);

module.exports = router;
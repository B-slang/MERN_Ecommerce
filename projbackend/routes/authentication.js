var express = require("express");
var router = express.Router();
const { check } = require("express-validator");

const { signout, signup, signin } = require("../controllers/authentication");

//simple validation
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("must be atleast 3 char long"),
    check("email").isEmail().withMessage("correct @ email is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password should be atleast 5 char long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("correct @ email is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password field in required"),
  ],
  signin
);


router.get("/signout", signout);

module.exports = router;

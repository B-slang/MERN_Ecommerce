const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser )


//populate
// router.get("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList ) // dnt know why it causes errr
router.get(
    "/orders/user/:userId",
    isSignedIn,
    isAuthenticated,
    userPurchaseList
  );
  




module.exports = router;
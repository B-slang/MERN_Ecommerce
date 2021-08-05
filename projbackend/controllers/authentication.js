const User = require("../models/user");
const jwt = require('jsonwebtoken')
const expressJwt  = require('express-jwt')
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  //validationResult errors//
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to save",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "user signout",
  });
};


//for signin route(checking the user exits or not) 
exports.signin = (req, res) =>{
  const errors = validationResult(req);
  const {email, password} = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  User.findOne({email}), (err, user)=>{
    if (err){
      res.status(400).json({
        error: "User Email does not exist"
      })
    }

    if(!user.authenticate(password)){
      return res.status(401).json({
        error: " Email and pass not match"
      })     

    }

    //create token
    const token = jwt.sign({_id: user._id},process.env.SECRET_KEY)

    //put token in cookie
    res.cookie("token", token, {expire: new Date() + 365});

    //send res to frontend
    const {_id, name, email, role} = user;
    return res.json({token, user: {_id, name, email, role}});
    
  }


};
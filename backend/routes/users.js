var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var twilioConfig = require('../config/config').twilio;
const { Validator } = require('node-input-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// const Sequelize = require('sequelize');
var cors = require('cors');

const db = require('../models');

// type: POST
// desc: to register new user
router.post('/users/register', (req,res,next)=>{
  

  var username = req.body.username;
  var password = req.body.password;

  if(!username || !password){
    return res.json({success:false, msg: 'username and password are required!'});
  }else{
    db.User.findOne({
      where: {username}
    }).then(user=>{
      if(user!=null){
        return res.json({success:false, msg: 'username already exists!'});
      }else{
        var newUser = {
          username
        }
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          // Store hash in database
          newUser.password = hashedPassword;
          db.User.create(newUser).then(user=>{
            user = JSON.parse(JSON.stringify(user));

            let payload = user;
            let token = jwt.sign(payload,'secret', { }); //won't expire
            res.json({ success: true, token: "Bearer " + token,user: user });
          })
        });

      }
    })
  }
    
})



// // GET users/login
// //post method
router.post('/users/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
    db.User.findOne({
      where:{username}

    }).then(user=>{
      if(user!=null){

        var hassPass = user.password;

        // hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
        bcrypt.compare(password, hassPass, function(err, result) {
            console.log(result);//true if matched

            if(result){
              // Passwords match
              let payload = user.dataValues;
              let token = jwt.sign(payload,'secret', { }); // won't expire
              // req.session.userType=payload.type;
              return res.json({ success: true, token: "Bearer " + token,user: payload });
            }else{
              return res.json({success:false,msg:'invalid credentials!'})
            }

        });

      }else{
        res.json({success:false,msg:"invalid credentials!"});
      }
    })

});




module.exports = {router};


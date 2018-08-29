'use strict';

const httpStatus = require('http-status-codes'); 
const sha256 = require('sha256');
let  _models = require('../models');

const registerUser = (req, res) => {
 
 const payload = {
     name: req.body.name,
     password: sha256(req.body.password),
     email: req.body.email
    }

  if(req.body.active)
   payload.active = req.body.active;

  _models.User.createUser(payload, (err, result) => {
    if(err)
      return sendResponse(res, err, null);

    return sendResponse(res, null, result);
  });   
}

const sendResponse = (res, err, message) => {
  
  if(err) 
    return res.status(httpStatus.BAD_REQUEST).json({error: {message: err}});

  return res.status(httpStatus.OK).json({output : message});
}

module.exports = {registerUser};
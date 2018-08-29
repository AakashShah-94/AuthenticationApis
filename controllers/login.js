'use strict';

const httpStatus = require('http-status-codes'); 
const sha256 = require('sha256');
const _models = require('../models');

const login = (req, res) => {

let email    = req.body.email;
let password = req.body.password;

 _models.User.getUser(email, (err, result) => {
   if(err)
     return sendResponse(res, err, null);
     
    if(result.password !== sha256(password))
      return sendResponse(res, 'INVALID_PASSWORD', null);

    return sendResponse(res, null, result);
  });   
 }; // end of login 

const sendResponse = (res, err, message) => {
 
 if(err) 
   return res.status(httpStatus.BAD_REQUEST).json({error: {message: err}});

 return res.status(httpStatus.OK).json({output : message});
}

module.exports = {login};

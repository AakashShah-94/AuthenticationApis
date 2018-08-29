'use strict';

const httpStatus = require('http-status-codes'); 
 const sha256 = require('sha256');
const _models = require('../models');

const resetPwd = (req, res) => {

 const email    =  req.body.email;
 const password =  sha256(req.body.password);

    const payload = {
        email: req.body.email,
        token: req.body.token
    };

    _models.Token.getToken(payload, (err, result) => {
        if(err)
          return sendResponse(res, err, null);
        
            updateUserPassword(email, password).then((response) => {
                return sendResponse(res, null, response);
            }).catch(err => {
                return sendResponse(res, err, null);
            });
    }); // end of getToken call
};

const updateUserPassword = (email, password) => {

  return new Promise ((resolve, reject) => {
  
    _models.User.updateUserPassword(email, password, (err, result) => {
        if(err)
          return reject(err);
 
         return resolve(result);
     }); // end of db call
  }); // end of the promise    
};


const sendResponse = (res, err, message) => {
 
    if(err) 
      return res.status(httpStatus.BAD_REQUEST).json({error: {message: err}});
   
    return res.status(httpStatus.OK).json({output : message});
};

module.exports = {resetPwd};
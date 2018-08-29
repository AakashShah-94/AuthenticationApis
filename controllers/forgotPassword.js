'use strict';

const crypto   = require('crypto');
const httpStatus = require('http-status-codes'); 
const _models = require('../models');
const nodemailer = require('nodemailer');
const emailOptions = require('../config.json').EMAIL;

const forgotPwd = (req, res) => {

   let email = req.body.email;
     
   _models.User.getUser(email, (err, result) => {
    if(err)
      return sendResponse(res, err, null);
	  
	  const token = crypto.randomBytes(4).toString('hex').toUpperCase();

		Promise.all([createToken(email,token), sendEmail(email,token)]).then((resultArr) => {
		   logger.log(resultArr[1]);
		   return sendResponse(res, null, 'Please check your email for password reset code');
		}).catch(err => {
			return sendResponse(res, err, null);
		});
   });// end of getUser   
};

const createToken = (email, token) => {
    return new Promise((resolve, reject) => {
	  
		const payload = {
			token : token,
			email : email
		}

		_models.Token.createToken(payload, (err, result) => {
		  if(err)
			 return reject(err);

			return resolve(result);
		});   
    }); // end of promise
};

const sendEmail = (email, token) => {
  return new Promise((resolve, reject) => {

	var transporter = nodemailer.createTransport({
		service: emailOptions.service,
		auth: {
		  user: emailOptions.from,
		  pass: emailOptions.password
		}
	});
	  
	  var mailOptions = {
		from: emailOptions.from,
		to: email,
		subject: emailOptions.subject,
		text: 'Recovery Token : ' + token
	  };
	  
	transporter.sendMail(mailOptions, function(err, info){
		if (err) {
		  logger.log(err);
		  return reject(err);
		} else {
		  logger.log('Email sent: ' + info.response);
		  return resolve(info.response);
		}
	});
 
  }); // end of promise
}

const sendResponse = (res, err, message) => {
 
    if(err) 
      return res.status(httpStatus.BAD_REQUEST).json({error: {message: err}});
   
    return res.status(httpStatus.OK).json({output : message});
   }

module.exports = {forgotPwd};
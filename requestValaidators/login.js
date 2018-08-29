const httpStatus = require('http-status-codes'); 
const _ = require('lodash');

const login = (req, res, next) => {

  if(typeof(req.body.email) === 'undefined' || _.isEmpty(req.body.email))
    return sendErrResponse(res, 'MANDATORY_PARAMATER_EMAIL_MISSING');

  if(typeof(req.body.password) === 'undefined' || _.isEmpty(req.body.password))
    return sendErrResponse(res, 'MANDATORY_PARAMATER_PASSWORD_MISSING');
  
    next();
}

const sendErrResponse = (res, err) => {
      return res.status(httpStatus.BAD_REQUEST).json({error: {message: err}});
}

module.exports = {login};
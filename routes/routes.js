const register = require('../controllers/register.js');
const login = require('../controllers/login.js');
const forgotPassword = require('../controllers/forgotPassword.js');
const resetPassword = require('../controllers/resetPassword.js');
const requestValidator = require('../requestValaidators');

module.exports = (app) => { 
    
    //POST API's
    app.post('/services/register', requestValidator.register, register.registerUser);
    app.post('/services/login', requestValidator.login, login.login);
    app.post('/services/password/forgot', requestValidator.forgotPwd, forgotPassword.forgotPwd);
    
    //PUT API's
    app.put('/services/password/reset', requestValidator.resetPwd, resetPassword.resetPwd);
}
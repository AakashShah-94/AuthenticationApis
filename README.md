# AuthenticationApis
basic authentication api's such as register user, login, forgot password and reset password using node.js

# Project Setup
Clone the repository , go into directory , npm install and then run npm start to start the server.

# ***** NOTE ******
Please replace the database credentials inside the local.json folder inside the env folder with proper database credentials.

Since this app emails a reset token for the password reset feature , please provide valid email accounts to send the email from and set them inside the EMAIL object inside the config.json folder.

Use POSTMAN to test the API's 

API PAYLOADS :

REGISTER :
{
"name": "",
"email": "",
"password":""
}

LOGIN :
{
"email" : "",
"password":""
}

FORGOT PASSWORD :

{
 "email":""
 }
 
RESET PASSWORD :
 
 {
 "email":"",
 "token":"",  // token sent to email id
 "password":"" //here password is the new password
 }
 

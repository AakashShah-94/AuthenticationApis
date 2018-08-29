'use strict';
const mongoose = require('mongoose');
const mongo = require('../env/local.json').MONGO;

const connect = () =>  {

    let conStr = 'mongodb://' + mongo.user + ':' + mongo.password + '@' + mongo.host + ':'+mongo.port + '/' + mongo.database; 
 
    return new Promise((resolve, reject) => {
       mongoose.connect(conStr);
       
       const connection = mongoose.connection;

         connection.on('error', () => {
          reject('connection error');
         });

          connection.on('open', () => {
           resolve('db- connected');
         });
    }); // end of promise
};

module.exports = {connect};
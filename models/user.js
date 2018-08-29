const mongoose = require('mongoose');
const crypto   = require('crypto');
const _        = require('lodash');
var Schema = mongoose.Schema;

const schema = new Schema({
    uid      : {type: String, required: true, unique: true},
    name     : {type:String, reruired: true},
    email    : {type:String, reruired: true, unique: true},
    password : {type:String, reruired: true},
    active   : {type:Boolean, default: true},
  }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


schema.statics = {

  createUser: function (payload, callback) {
    let uid = crypto.randomBytes(16).toString('hex');
    payload.uid = uid;
    
    const newUser = new this(payload);

    newUser.save(payload, (err, result) => {
      if(err)
        return callback(err, null);
      
      return callback(null, result);
    });
  }, // end of create user

  getUser : function (email, callback) {
    this.findOne({email:email}).lean().exec((err, result) => {
      if(err)
        return callback(err, null);
      
      if(_.isEmpty(result))
        return callback('INVALID_EMAIL_ID', null);

    return callback(null, result);
    });
  }, //end of get user

  updateUserPassword : function (email,password, callback) {
    this.findOneAndUpdate({email:email},{password:password},{new:true}).lean().exec((err, result) => {
      if(err)
        return callback(err, null);
      
      if(_.isEmpty(result))
        return callback('INVALID_EMAIL_ID', null);

      return callback(null, result);
    });
  } //end of update user

}

module.exports = {name: 'User', schema: schema};
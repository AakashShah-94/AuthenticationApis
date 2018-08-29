const mongoose = require('mongoose');
const crypto   = require('crypto');
const _        = require('lodash');
Schema = mongoose.Schema;

const schema = new Schema({
    uid      : {type: String, required: true, unique: true},
    token    : {type: String, required: true, unique: true},
    email    : {type: String, required: true},
  }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schema.statics = {

    createToken : function (payload, callback) {
      let uid = crypto.randomBytes(16).toString('hex');
      payload.uid = uid;
      
      const newToken = new this(payload);
   
      newToken.save(payload, (err, result) => {
        if(err)
          return callback(err, null);
          
       return callback(null, result);
      });
    }, // end of create token

    getToken : function (payload, callback) {
     this.findOne(payload).lean().exec((err, result) => {
       if(err)
         return callback(err, null);
       
       if(_.isEmpty(result))
         return callback('INVALID_TOKEN', null);
   
      return callback(null, result);
     });
   } //end of get token
   
};
   
module.exports = {name: 'Token', schema: schema};
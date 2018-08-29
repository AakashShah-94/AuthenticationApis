const mongoose = require('mongoose');
let user  = require('./user');
let token = require('./token');

const _models = {};

_models[user.name] = mongoose.model(user.name, user.schema);
_models[token.name] = mongoose.model(token.name, token.schema);

module.exports = _models;
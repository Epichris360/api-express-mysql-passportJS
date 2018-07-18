const { User }   = require('../models');
const validator  = require('validator');
const { to, TE } = require('../services/util.service');

// this is so they can send in 3 options unique_key, email, or phone and it will work
const getUniqueKeyFromBody = function(body){
  let unique_key = body.unique_key;
  if(typeof unique_key === 'undefined' ){
    if(typeof body.email != 'undefined'){
      unique_key = body.email;
    }else if(typeof body.phone != 'undefined'){
      unique_key = body.phone;
    }else{
      unique_key = null;
    }
  }
  return unique_key;
}

module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

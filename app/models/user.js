// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

  local            : {
    email        : String,
    password     : String
  },

  phi            :{
    height       : {
      visible: { type: Boolean, default: false },
      content: { type: String, default: 'type here to edit height' }
    },
    weight       : {
      visible: { type: Boolean, default: false },
      content: { type: String, default: 'type here to edit weight' }
    },
    bp       : {
      visible: { type: Boolean, default: false },
      content: { type: String, default: 'type here to edit bp' }
    },
    hr       : {
      visible: { type: Boolean, default: false },
      content: { type: String, default: 'type here to edit hr' }
    },
    pap       : {
      visible: { type: Boolean, default: false },
      content: { type: String, default: 'type here to edit pap' }
    },
    skin       : {
      visible: { type: Boolean, default: false },
      content: { type: String, default: 'type here to edit skin' }
    }
  }});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);


//source: https://scotch.io/tutorials/easy-node-authentication-setup-and-local

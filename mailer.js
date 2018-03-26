//nodemailer.js

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'roxysfarkas@gmail.com',
    pass: 'majorstudio2'
  }
});


var heightMailer = {

  sendHeight: function(toField){
    console.log('about to sendEmail, toField:', toField);

    let mailOptions = {
      from: '"HealthAid" <roxysfarkas@gmail.com>', // sender address
      to: toField,
      subject: 'Height EMAIL',
      html: {path: 'http://localhost:3000/heightEmail'},
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      // return 'Message %s sent: %s', info.messageId, info.response;
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}

var weightMailer = {

  sendWeight: function(toField){
    console.log('about to sendEmail, toField:', toField);

    let mailOptions = {
      from: '"HealthAid" <roxysfarkas@gmail.com>',
      to: toField,
      subject: 'weight EMAIL',
      html: {path: 'http://localhost:3000/weightEmail'},
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}

var bpMailer = {

  sendBp: function(toField){
    console.log('about to sendEmail, toField:', toField);

    let mailOptions = {
      from: '"HealthAid" <roxysfarkas@gmail.com>',
      to: toField,
      subject: 'bp EMAIL',
      html: {path: 'http://localhost:3000/bpEmail'},
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}

var hrMailer = {

  sendHr: function(toField){
    console.log('about to sendEmail, toField:', toField);

    let mailOptions = {
      from: '"HealthAid" <roxysfarkas@gmail.com>',
      to: toField,
      subject: 'hr EMAIL',
      html: {path: 'http://localhost:3000/hrEmail'},
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}

var papMailer = {

  sendPap: function(toField){
    console.log('about to sendEmail, toField:', toField);

    let mailOptions = {
      from: '"HealthAid" <roxysfarkas@gmail.com>',
      to: toField,
      subject: 'pap EMAIL',
      html: {path: 'http://localhost:3000/papEmail'},
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}

var skinMailer = {

  sendSkin: function(toField){
    console.log('about to sendEmail, toField:', toField);

    let mailOptions = {
      from: '"HealthAid" <roxysfarkas@gmail.com>',
      to: toField,
      subject: 'skin EMAIL',
      html: {path: 'http://localhost:3000/skinEmail'},
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}


  module.exports = { heightMailer, weightMailer, bpMailer, hrMailer, papMailer, skinMailer};


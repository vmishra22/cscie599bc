'use strict';

var async = require('async');
var nodemailer = require('nodemailer');

function createEmailTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'reclettersystem@gmail.com',
      pass: 'cscie599'
    }
  });
}

export function emailRecommender(req, res) {
  console.log('Entering emailRecommender..');
  console.log(req.body);

  var recommenderName =  req.body.recommenderName;
  var recommenderEmail = req.body.recommenderEmail;
  var studentName = req.body.studentName;
  
  if(!recommenderName 
      || !recommenderEmail
      || !studentName) {
        return res.status(500).send("Required input is missing");
      }
  
  var emailTransport = createEmailTransport();

  var mailOptions = {
    from: 'reclettersystem@gmail.com',
    to: recommenderEmail,
    subject: 'Invitation to join Rec-Letters',
    html: '<p>Hi '+recommenderName+'</p><p>'+studentName+' would like you to write a recommendation letter. Please join <a href="https://www.recletters.org">Rec-Letters</a> to write recommendation letters!</p><p>Thank you!<p>'
  };
  
  emailTransport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send();
    }
  });
}

export function emailRegistrationConfirmation(req, res) {
  console.log('Entering emailRegistrationConfirmation..');
  console.log(req.body);

  var name =  req.body.name;
  var email = req.body.email;
  
  if(!name || !email) {
    return res.status(500).send("Required input is missing");
  }
  
  var emailTransport = createEmailTransport();

  var mailOptions = {
    from: 'reclettersystem@gmail.com',
    to: email,
    subject: 'Please confirm your registration for Rec-Letters',
    html: '<p>Hi '+name+'</p><p>You recently registered at Rec-Letters. Please <a href="https://www.recletters.org/registrationConfirmation">click here</a> to confirm your registration!</p><p>Thank you!<p>'
  };
  
  emailTransport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send();
    }
  });
}
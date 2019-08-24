'use strict';

const trainerstore = require('../models/trainer-store');
const memberstore = require('../models/member-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Play Gym',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('trainer', '');
    response.cookie('member', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid();
    member.assessments=[];
    member.goals= [];
    member.bmi=0;
    member.isIdealWeight = true;
    member.bmiCategory = "";
    memberstore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    const password = request.body.password;
    if (trainer && password == trainer.password) {
      response.cookie('trainer', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect('/trainerdashboard');
    } 
    else {
      const member = memberstore.getMemberByEmail(request.body.email);
      if (member&& password == member.password ){
      response.cookie('member', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/memberdashboard/'+member.id);
      }
      else {
        response.redirect('/login');
      }
    }
  },
getCurrentTrainer(request) {
    const userEmail = request.cookies.trainer;
    return trainerstore.getTrainerByEmail(userEmail);
  },

};

module.exports = accounts;
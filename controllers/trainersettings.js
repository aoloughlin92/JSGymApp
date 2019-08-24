'use strict';
const uuid = require('uuid');
const logger = require('../utils/logger');
//const trainerCollection = require('../models/trainer-store.js');
const trainerStore = require('../models/trainer-store');
const accounts = require('../controllers/accounts');

const trainersettings = {
  index(request, response) {
    const trainer = accounts.getCurrentTrainer(request);
    logger.info("Trainer: " +trainer.id);
    const viewData = {
      title: "Settings",
      trainer: trainer
    };
    response.render("trainersettings", viewData);
  },
  update(request,response){
    const trainer = accounts.getCurrentTrainer(request);
    logger.debug("Updating trainer email = ", trainer.email);
    const name = request.body.name;
    const gender = request.body.gender;
    const email = request.body.email;
    const password = request.body.password;
    trainerStore.updateTrainer(trainer.id,name,gender,email,password);
    
    response.redirect("/trainersettings");
  }
}


module.exports = trainersettings;
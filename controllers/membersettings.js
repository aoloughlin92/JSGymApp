'use strict';
const uuid = require('uuid');
const logger = require('../utils/logger');
//const memberCollection = require('../models/member-store.js');
const memberStore = require('../models/member-store');

const membersettings = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug("Member id = ", memberId);
    const member = memberStore.getMember(memberId);

    const viewData = {
      title: "Settings",
      member: member
    };
    response.render("membersettings", viewData);
  },
  update(request,response){
    const memberId = request.params.id;
    logger.debug("Updating member id = ", memberId);
    const name = request.body.name;
    const gender = request.body.gender;
    const email = request.body.email;
    const password = request.body.password;
    const address = request.body.address;
    const height = request.body.height;
    const startingWeight = request.body.startingWeight;
    memberStore.updateMember(memberId,name,gender,email,password,address,height,startingWeight);
    
    response.redirect("/membersettings/" + memberId);
  }
}


module.exports = membersettings;
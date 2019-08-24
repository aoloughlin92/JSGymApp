"use strict";
const uuid = require('uuid');
const logger = require("../utils/logger");
const memberStore = require('../models/member-store');
//const memberCollection=require('../models/member-store.js');


const trainerdashboard = {
  index(request, response) {
    const trainerId = request.params.id;
    logger.info("trainerdashboard rendering");
    const viewData = {
      title: "Play Gym",
      members: memberStore.getAllMembers(),
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render("trainerdashboard", viewData);
  },
  deleteMember(request, response) {
    const trainerId = request.params.id;
    const memberId = request.params.memberid;
    logger.debug('Deleting Member ${memberId}');
    memberStore.removeMember(memberId);
    response.redirect('/trainerdashboard');
  },
  editComment(request,response){
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    const newComment = request.body.comment;
    memberStore.updateComment(memberId,assessmentId,newComment);
    response.redirect('/member/'+memberId);
    
  },
  addMember(request, response) {
    const newMember = {
      id: uuid(),
      name: request.body.name,
      gender: request.body.gender,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      height: request.body.height,
      startingWeight: request.body.startingWeight,
      assessments:[],
  
    };
    memberStore.addMember(newMember);
    response.redirect('/trainerdashboard');
  },
};


module.exports = trainerdashboard;

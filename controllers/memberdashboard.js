'use strict';
const uuid = require('uuid');
const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const analytics= require('../utils/analytics');

const memberdashboard = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug("Member id = ", memberId);
    const member = memberStore.getMember(memberId);
    member.assessments.sort(function(a, b) {
    return parseFloat(b.millis) - parseFloat(a.millis);
    });
    const viewData = {
      title: "Member",
      member: member,
    };
    
    response.render("memberdashboard", viewData);
  },

  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect("/memberdashboard/" + memberId);
  },
  
  addAssessment(request,response){
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    member.assessments.sort(function(a, b) {
    return parseFloat(b.millis) - parseFloat(a.millis);
    }); 
    var prevWeight;
    if(member.assessments.length==0){
      prevWeight = member.startingWeight;
    }
    else{
      const prevAssessment = member.assessments[0];
      prevWeight = prevAssessment.weight;
    }
    const idealWeight = analytics.idealBodyWeight(member.gender,member.height);
    const today = new Date();
    const dateString = analytics.convertDate(today);
    const newAssessment = {
      id: uuid(),
      millis: today.getTime(),
      date: dateString,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh:request.body.thigh, 
      upperArm: request.body.upperArm,
      waist : request.body.waist,
      hips : request.body.hips,
      trend: analytics.assessmentTrend(request.body.weight,prevWeight,idealWeight),
      comment:""
    };
    memberStore.addAssessment(memberId, newAssessment);
    logger.debug('New Assessment = ', newAssessment);
    response.redirect('/memberdashboard/'+memberId);
  },
};


module.exports = memberdashboard;
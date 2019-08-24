'use strict';
const uuid = require('uuid');
const logger = require('../utils/logger');
//const memberCollection = require('../models/member-store.js');
const memberStore = require('../models/member-store');
const trainerStore = require('../models/trainer-store');
const goalAnalysis= require('../utils/goalAnalysis');

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug("Member id = ", memberId);
    const member = memberStore.getMember(memberId);
    member.assessments.sort(function(a, b) {
    return parseFloat(b.millis) - parseFloat(a.millis);
    });
    var goal;
    for(goal of member.goals){
      goalAnalysis.goalStatus(goal,member);
    }
    const viewData = {
      title: "Member",
      member: memberStore.getMember(memberId),
      goalsummary: goalAnalysis.goalSummary(member)
    };
    response.render("member", viewData);
  },

  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect("/member/" + memberId);
  },
  addGoal(request,response){
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    if(member.assessments.length>0){
      const currentAssessment = member.assessments[0];
      const newGoal = {
        id:uuid(),
        date: request.body.date,
        measurement: request.body.measurement, 
        target : request.body.target,
        status: "Open",
        startMeasurements: currentAssessment
      }
      memberStore.addGoal(memberId, newGoal);
      logger.debug('New Goal= ', newGoal);
    }
    else{
      logger.info('Goal could not be added - please add an assessment first');
    }
    response.redirect('/member/'+memberId);
  },
  addAssessment(request,response){
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const newAssessment = {
      id: uuid(),
      date: new Date(Date.now()),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh:request.body.thigh, 
      upperArm: request.body.upperArm,
      waist : request.body.waist,
      hips : request.body.hips,
      trend: "good",
      comment:""
    };
    memberStore.addAssessment(memberId, newAssessment);
     logger.debug('New Assessment = ', newAssessment);
    logger.info('New Assessment = ', newAssessment);
    response.redirect('/member/'+memberId);
  },
};


module.exports = member;
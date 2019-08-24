'use strict';
const _ = require('lodash');
const JsonStore = require('./json-store');
const analytics= require('../utils/analytics');
const memberStore = {

  

  store: new JsonStore('./models/member-store.json', { memberCollection: [] }),
  collection: 'memberCollection',
  
  getUserMembers(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMember(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  removeAssessment(id,assessmentId){
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.remove(assessments,{id:assessmentId});
    this.updateMemberStats(id);
    this.store.save();
  },
  updateMember(id,name,gender,email,password,address,height,weight){
    const member = this.getMember(id);
    member.name = name;
    member.gender  = gender;
    member.email = email;
    member.password = password;
    member.address = address;
    member.height = height;
    member.startingWeight = weight;
    this.store.save();
  },
  updateComment(id,assessmentId, newComment){
    const member = this.getMember(id);
    const assessments = member.assessments;
    const assessment = _.find(assessments,{id:assessmentId});
    assessment.comment = newComment;
    this.store.save();    
  },
  updateMemberStats(id){
    const member = this.getMember(id);
    const assessments = member.assessments;
    const height = member.height;
    const gender = member.gender.charAt(0).toUpperCase();
    var weight = 0;
    if(assessments.length>0){
      const latest = assessments[assessments.length-1];
      weight = latest.weight;
    }
    else{
      weight = member.startingweight;
    }
    const bmiValue = analytics.calculateBMI(weight,height);
    member.bmi=bmiValue;
    member.bmiCategory = analytics.determineBMICategory(bmiValue);
    member.isIdealWeight = analytics.isIdealBodyWeight(gender,weight,height);
  },
  removeMember(id){
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },
  addAssessment(id,assessment){
    const member = this.getMember(id);
    member.assessments.push(assessment);
    this.store.save();
    this.updateMemberStats(id);
    this.store.save();
  },
  addGoal(id,goal){
    const member = this.getMember(id);
    member.goals.push(goal);
    this.store.save();
  },
  updateGoalStatus(id,goalId,status){
    const member = this.getMember(id);
    const goals = member.goals;
    const goal = _.find(goals,{id:goalId});
    goal.status = status;
    this.store.save();
  },
  addMember(member){
    this.store.add(this.collection, member);
    this.store.save();
    this.updateMemberStats(member.id);
    this.store.save();
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  removeAllMembers(){
    this.store.removeAll(this.collection);
    this.store.save();
  },
};

module.exports = memberStore;
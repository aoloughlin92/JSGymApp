'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store');

const goalAnalysis = {
  goalStatus(goal,member){
    if(goal.status == "Open"){     
      if(new Date(goal.date)<new Date()){
        memberStore.updateGoalStatus(member.id, goal.id, "Missed")
      }
      else{
        const prevAssessment = member.assessments[0];
        var start;
        var current;
        const startMeasurements = goal.startMeasurements;
        const target = goal.target;
        if(goal.measurement == "Weight"){
          start = startMeasurements.weight;
          current = prevAssessment.weight;
        }
        else if(goal.measurement  == "Chest"){
          start = startMeasurements.chest;
          current = prevAssessment.weight;        
        }
        else if(goal.measurement  == "Thigh"){
          start = startMeasurements.thigh;
          current = prevAssessment.weight;        
        }
        else if(goal.measurement  = "Upper Arm"){
          start = startMeasurements.upperArm;
          current = prevAssessment.weight;        
        }
        else if(goal.measurement  == "Waist"){
          start = startMeasurements.waist;
          current = prevAssessment.weight;        
        }
        else if(goal.measurement  == "Hips"){
          start = startMeasurements.hips;
          current = prevAssessment.weight;        
        }
        if(start>target){
          const targetLoss = start - target;
          const currentLoss = start - current;

          if(currentLoss >= targetLoss ){
            memberStore.updateGoalStatus(member.id, goal.id, "Achieved")
          }
        }
        if(start<=target){
          const targetGain = target - start;
          const currentGain = current - start;        
          if(currentGain>=targetGain){
            memberStore.updateGoalStatus(member.id, goal.id, "Achieved")
          }
        }
      }
    }
  },
  goalSummary(member){
    const goalSummary= {
      open:0,
      missed:0,
      achieved:0,
    }
    var goal;
    for(goal of member.goals ){
      if(goal.status=="Open"){
        goalSummary.open++;
      }
      else if(goal.status =="Achieved"){
        goalSummary.achieved ++;
      }
      else if(goal.status == "Missed"){
        goalSummary.missed++;
      }
    }
    return goalSummary;
  }

};


module.exports = goalAnalysis;
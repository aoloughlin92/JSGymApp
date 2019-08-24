'use strict';

const logger = require('../utils/logger');


const analytics = {
  calculateBMI(weight,height)
  {
    if(height<0){
      return 0;
    }
    else
      return Math.round(weight/(height*height)*100)/100;
  },
  determineBMICategory(bmiValue){
    if(bmiValue<15.0){
      return "Very Severely Underweight";
    }
    else if(bmiValue>=15 && bmiValue < 16){
      return "Severely Underweight";
    }
    else if(bmiValue>=16 && bmiValue < 18.5){
      return "Underweight";
    }
    else if(bmiValue>=18.5 && bmiValue<25){
      return "Normal";
    }
    else if(bmiValue>=25 && bmiValue <35){
      return "Moderately Obese";
    }
    else if(bmiValue>=35 && bmiValue <40){
      return "Severely Obese";
    }
    else if(bmiValue>=40 && bmiValue <1000){
      return "Very Severely Obese";
    }
    else 
      return "No category available.";
  },
  idealBodyWeight(gender,height){
    const heightInches = height*38.37;
    var idealBodyWeight=0;
    var isIdeal;
    const fiveFeet = 60;
    if(heightInches<= fiveFeet){
      if(gender == 'M'){
        idealBodyWeight = 50;
      }
      else
        idealBodyWeight = 45.5;
    }
    else{
      if(gender == 'M'){
        idealBodyWeight = 50+((heightInches - fiveFeet)*2.3);
      }
      else
        idealBodyWeight = 45.5+((heightInches - fiveFeet)*2.3);
    }
    logger.info('Ideal Weight: '+idealBodyWeight); 
    return idealBodyWeight;
  },
  isIdealBodyWeight(gender,weight,height){
    const idealBodyWeight = analytics.idealBodyWeight(gender,height);
    var isIdeal;
    if((idealBodyWeight <= (weight + 2.0))&& (idealBodyWeight >= (weight - 2.0))){
      isIdeal = "green";
    }
    else{
      isIdeal = "red";
    }
    return isIdeal;    
  },
  assessmentTrend(currentWeight,previousWeight,idealWeight){
   if(Math.abs(currentWeight - idealWeight)<= Math.abs(previousWeight - idealWeight)){
     return "teal";
   }
    else{
      return "red";
    }
  },
  convertDate(date){
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const d = date.getDate();
    const m = date.getMonth(); //Month from 0 to 11
    const y = date.getFullYear();
    var h = date.getHours();
    if(h<10){
      h="0"+h;
    }
    var min = date.getMinutes();
    if(min<10){
      min="0"+min;
    }
    var s = date.getSeconds();
    if(s<10){
      s="0"+s;
    }
    return d+"-"+months[m]+"-"+y+" "+h+":"+min+":"+s;
  }
};


module.exports = analytics;
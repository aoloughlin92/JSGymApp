"use strict";

const express = require("express");
const router = express.Router();
const accounts = require('./controllers/accounts.js');
const trainerdashboard = require("./controllers/trainerdashboard.js");
const memberdashboard = require("./controllers/memberdashboard.js");
const membersettings = require("./controllers/membersettings.js");
const about = require("./controllers/about.js");
const member = require("./controllers/member.js");
const trainersettings = require("./controllers/trainersettings.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup",accounts.signup);
router.get("/logout",accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/membersettings/:id', membersettings.update);


router.get("/trainerdashboard/", trainerdashboard.index);
router.get("/memberdashboard/:id", memberdashboard.index);
router.get("/about/:id", about.index);
router.get("/trainerabout", about.trainerindex);
router.get("/member/:id", member.index);
router.get("/memberdashboard/:id/deleteassessment/:assessmentid",memberdashboard.deleteAssessment);
router.get("/trainerdashboard/deletemember/:memberid",trainerdashboard.deleteMember);
router.get("/membersettings/:id", membersettings.index);
router.get("/trainersettings", trainersettings.index);

router.post("/trainersettings", trainersettings.update);
router.post('/register', accounts.register);
router.post('/memberdashboard/:id/addassessment', memberdashboard.addAssessment);
router.post('/trainerdashboard/addmember', trainerdashboard.addMember);
router.post("/editcomment/:id/:assessmentid", trainerdashboard.editComment);
router.post("/memberdashboard/:id/addgoal",memberdashboard.addGoal);
router.post("/member/:id/addgoal",member.addGoal);

module.exports = router;

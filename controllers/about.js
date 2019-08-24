"use strict";

const logger = require("../utils/logger");
const memberStore = require('../models/member-store');


const about = {
  index(request, response) {
    const memberId = request.params.id;
    logger.info("about rendering");
    const viewData = {
      title: "About",
      member: memberStore.getMember(memberId)
    };
    response.render("about", viewData);
  },

  trainerindex(request, response) {
    logger.info("about rendering");
    const viewData = {
      title: "About",
    };
    response.render("trainerabout", viewData);
  }
};
 

module.exports = about;

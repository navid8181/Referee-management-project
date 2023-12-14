const { tableMatchController } = require('../../http/controller/tableMatch.controller');

const router = require('express').Router();


router.post("/add/:participantID",tableMatchController.add)




module.exports = {apiTableMatchRouter : router}
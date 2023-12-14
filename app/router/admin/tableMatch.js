const { tableMatchController } = require('../../http/controller/tableMatch.controller');

const router = require('express').Router();


router.post("/add/:participantID",tableMatchController.add)
router.post("/add-score/:id",tableMatchController.addScore)




module.exports = {apiTableMatchRouter : router}
const { refereeController } = require('../../http/controller/referee.controller');

const router = require('express').Router();

router.post("/add",refereeController.add)



module.exports  = {apiRefereeRouter : router}
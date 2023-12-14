const { refereeController } = require('../../http/controller/referee.controller');

const router = require('express').Router();

router.get("/all",refereeController.getAll)
router.post("/add",refereeController.add)



module.exports  = {apiRefereeRouter : router}
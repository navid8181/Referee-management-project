const { refereeController } = require('../../http/controller/referee.controller');

const router = require('express').Router();

router.post("/add",refereeController.add)
router.get("/all",refereeController.getAll)
router.delete("/remove/:id",refereeController.removeByID)



module.exports  = {apiRefereeRouter : router}
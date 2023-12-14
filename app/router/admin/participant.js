const { participantController } = require('../../http/controller/participant.controller');


const router = require('express').Router();

router.post("/add",participantController.add)
router.get("/all",participantController.getAll)
router.get("/:id",participantController.getParticipantByID)
router.delete("/remove/:id",participantController.removeByID)



module.exports  = {apiParticipantRouter : router}
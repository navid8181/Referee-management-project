const { apiParticipantRouter } = require('./participant');
const { apiRefereeRouter } = require('./referee');

const router = require('express').Router();



router.use("/referee",apiRefereeRouter)
router.use("/participant",apiParticipantRouter)




module.exports = {apiAdminRoutes : router}






const { apiParticipantRouter } = require('./participant');
const { apiRefereeRouter } = require('./referee');
const { apiTableMatchRouter } = require('./tableMatch');

const router = require('express').Router();



router.use("/referee",apiRefereeRouter)
router.use("/participant",apiParticipantRouter)
router.use("/table-match",apiTableMatchRouter)




module.exports = {apiAdminRoutes : router}






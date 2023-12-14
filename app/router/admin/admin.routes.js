const { apiRefereeRouter } = require('./referee');

const router = require('express').Router();



router.use("/referee",apiRefereeRouter)




module.exports = {apiAdminRoutes : router}






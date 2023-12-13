const { apiAdminRoutes } = require('./admin/admin.routes');

const router =  require('express').Router();




router.use("/admin",apiAdminRoutes)







module.exports = {allRoutes : router}
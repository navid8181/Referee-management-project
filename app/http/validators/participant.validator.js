const createHttpError = require("http-errors");
const Joi = require("joi");

const participantSchemaValidator = Joi.object({

    name : Joi.string().min(3).max(15).required().error(new createHttpError.BadRequest("نام وارد شده باید بین 3 تا 15 کاراکتر باشد")),
    last_name : Joi.string().min(3).max(15).required().error(new createHttpError.BadRequest("نام خانوادگی وارد شده باید بین 3 تا 15 کاراکتر باشد")),



})

module.exports = {participantSchemaValidator}
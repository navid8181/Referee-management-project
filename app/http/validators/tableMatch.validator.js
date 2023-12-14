const createHttpError = require("http-errors");
const Joi = require("joi");

const tableMatchSchemaValidator = Joi.object({

    type : Joi.string().min(3).max(15).required().error(new createHttpError.BadRequest("نوع ورزش وارد شده باید بین 3 تا 15 کاراکتر باشد")),
    



})

module.exports = {tableMatchSchemaValidator}
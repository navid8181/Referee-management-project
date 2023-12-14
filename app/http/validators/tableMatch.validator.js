const createHttpError = require("http-errors");
const Joi = require("joi");
const { MongoIdPattern } = require("../../utils/Constant");

const tableMatchSchemaValidator = Joi.object({

    type : Joi.string().min(3).max(15).required().error(new createHttpError.BadRequest("نوع ورزش وارد شده باید بین 3 تا 15 کاراکتر باشد")),
    



})
const tableAddScoreSchemaValidator = Joi.object({

    score : Joi.number().error(new createHttpError.BadRequest("امتیاز ورودی باید عدد باشد")).allow(),
    refereeID :Joi.string().pattern(MongoIdPattern).error(createHttpError.BadRequest("شناسه داور مورد نظر اشتباه می باشد"))




})

module.exports = {tableMatchSchemaValidator,tableAddScoreSchemaValidator}
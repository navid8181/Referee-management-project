const createHttpError = require("http-errors")
const { MongoIdPattern } = require("../../utils/Constant")
const Joi = require("joi")

const objectIdValidator = Joi.object({


    id : Joi.string().pattern(MongoIdPattern).error(createHttpError.BadRequest("شناسه مورد نظر اشتباه می باشد"))



 })


 module.exports = {
    objectIdValidator
 }
const { RefereeModel } = require("../../models/referee.model");
const { removeWrongData } = require("../../utils/function");
const { refereeSchemaValidator } = require("../validators/referee.validator");
const { StatusCodes } = require("http-status-codes")
const Controller = require("./Controller");
const { createMessage, createDataMessage } = require("../../utils/responseMessage");

class RefereeController extends Controller {

    async add(req, res, next) {
        try {
            const data = req.body;
            removeWrongData(data, ["_id"]);

            await refereeSchemaValidator.validateAsync(data);

            const refereeResult = await RefereeModel.create(data);

           return res.status(StatusCodes.CREATED).json(createMessage(StatusCodes.CREATED, "داور با موفقیت ثبت شد"))


        } catch (error) {
            next(error)
        }
    }

    async getAll(req,res,next){
        try {

            const referees = await RefereeModel.find({},{__v : 0});

            res.status(StatusCodes.OK).json(createDataMessage(StatusCodes.OK,{referees}))
            
        } catch (error) {
            next(error)
        }
    }
    
    // async getAll(req,res,next){
    //     try {
            
    //     } catch (error) {
    //         next(error)
    //     }
    // }


}

module.exports = { refereeController: new RefereeController() }
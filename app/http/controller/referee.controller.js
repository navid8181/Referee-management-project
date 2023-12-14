const { RefereeModel } = require("../../models/referee.model");
const { removeWrongData } = require("../../utils/function");
const { refereeSchemaValidator } = require("../validators/referee.validator");
const { StatusCodes } = require("http-status-codes")
const Controller = require("./Controller");
const { createMessage, createDataMessage } = require("../../utils/responseMessage");
const { objectIdValidator } = require("../validators/public.validator");
const createHttpError = require("http-errors");

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

    async getAll(req, res, next) {
        try {

            const referees = await RefereeModel.find({}, { __v: 0 });

            res.status(StatusCodes.OK).json(createDataMessage(StatusCodes.OK, { referees }))

        } catch (error) {
            next(error)
        }
    }

    async removeByID(req, res, next) {
        try {
            const { id } = req.params;
            await objectIdValidator.validateAsync({ id });

            await this.findReferee(id);

            const removeResult = await RefereeModel.deleteOne({ _id: id });

            if (removeResult.deletedCount == 0)
                throw createHttpError.InternalServerError("داور حذف نشد")

                return res.status(StatusCodes.OK).json(createMessage(StatusCodes.OK, "داور با موفقیت حذف شد"))

        } catch (error) {
            next(error)
        }
    }

    async getRefereeByID(req,res,next){
        try {
            const { id } = req.params;
            await objectIdValidator.validateAsync({ id });

            const referee = await this.findReferee(id)

            res.status(StatusCodes.OK).json(createDataMessage(StatusCodes.OK, { referee }))
        } catch (error) {
            next(error)
        }
    }

    async findReferee(id){
        const referee = await RefereeModel.findOne({_id : id},{__v : 0})

        if (!referee)
        throw new createHttpError.BadRequest("داوری ای با این مشخصات یافت نشد")

        return referee;
    }

}

module.exports = { refereeController: new RefereeController() }
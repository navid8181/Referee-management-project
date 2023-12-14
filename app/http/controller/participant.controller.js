
const { removeWrongData } = require("../../utils/function");
const { StatusCodes } = require("http-status-codes")
const Controller = require("./Controller");
const { createMessage, createDataMessage } = require("../../utils/responseMessage");
const { objectIdValidator } = require("../validators/public.validator");
const createHttpError = require("http-errors");
const { participantSchemaValidator } = require("../validators/participant.validator");
const { ParticipantModel } = require("../../models/participant.model");

class ParticipantController extends Controller {

    async add(req, res, next) {
        try {
            const data = req.body;
            removeWrongData(data, ["_id"]);

            await participantSchemaValidator.validateAsync(data);

             await ParticipantModel.create(data);

            return res.status(StatusCodes.CREATED).json(createMessage(StatusCodes.CREATED, "شرکت کننده با موفقیت ثبت شد"))


        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {

            const participants = await ParticipantModel.find({}, { __v: 0 });

            res.status(StatusCodes.OK).json(createDataMessage(StatusCodes.OK, { participants }))

        } catch (error) {
            next(error)
        }
    }

    async removeByID(req, res, next) {
        try {
            const { id } = req.params;
            await objectIdValidator.validateAsync({ id });

            await this.findParticipant(id)
            const removeResult = await ParticipantModel.deleteOne({ _id: id });

            if (removeResult.deletedCount == 0)
                throw createHttpError.InternalServerError("شرکت کننده حذف نشد")

                return res.status(StatusCodes.OK).json(createMessage(StatusCodes.OK, "شرکت کننده با موفقیت حذف شد"))

        } catch (error) {
            next(error)
        }
    }

    async getParticipantByID(req,res,next){
        try {
            const { id } = req.params;
            await objectIdValidator.validateAsync({ id });

            const participant = await this.findParticipant(id)
           

            res.status(StatusCodes.OK).json(createDataMessage(StatusCodes.OK, { participant }))
        } catch (error) {
            next(error)
        }
    }
    async findParticipant(id){

        const participant = await ParticipantModel.findOne({_id : id},{__v : 0})

        if (!participant)
            throw new createHttpError.BadRequest("شرکت کننده ای با این مشخصات یافت نشد")

        return participant;
    }

}

module.exports = { participantController: new ParticipantController() }
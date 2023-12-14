const createHttpError = require("http-errors");
const { ParticipantModel } = require("../../models/participant.model");
const { TableMatchModel } = require("../../models/tableMatch.model");
const { objectIdValidator } = require("../validators/public.validator");
const { tableMatchSchemaValidator, tableAddScoreSchemaValidator } = require("../validators/tableMatch.validator");
const { StatusCodes } = require("http-status-codes")

const Controller = require("./Controller");
const { createMessage, createDataMessage } = require("../../utils/responseMessage");
const {RefereeModel} = require("../../models/referee.model");

class TableMatchController extends Controller {



    async getAll(req,res,next){

        try {

            const tableMatches = await TableMatchModel.find({},{__v : 0}).populate("participantID",{__v : 0,_id : 0}).populate("scoreTable.refereeID",{__v : 0,_id : 0})

            return res.status(StatusCodes.OK).json(createDataMessage(StatusCodes.OK,{tableMatches}))
            
        } catch (error) {
            next(error)
        }

    }
    async getTableMatchByID(req,res,next){

        try {
            const {id} = req.params;
            await objectIdValidator.validateAsync({id})
            const tableMatch = await TableMatchModel.find({_id : id},{__v : 0}).populate("participantID",{__v : 0,_id : 0}).populate("scoreTable.refereeID",{__v : 0,_id : 0})

            return res.status(StatusCodes.OK).json(createDataMessage(StatusCodes.OK,{tableMatch}))
            
        } catch (error) {
            next(error)
        }

    }

    async add(req, res, next) {

        try {

            const { participantID } = req.params;

            const data = req.body;
            const { type } = await tableMatchSchemaValidator.validateAsync(data);

            await objectIdValidator.validateAsync({ id: participantID });


            await this.findParticipant(participantID)

            const tableMatch = await this.findTableMatch(participantID, type)

            if (tableMatch)
                throw createHttpError.BadRequest("جدول مسابقه با این مشخصات از قبل ثبت شده است")


            await TableMatchModel.create({ participantID, type });

            return res.status(StatusCodes.CREATED).json(createMessage(StatusCodes.CREATED, "جدول با موفقیت ثبت شد"))


        } catch (error) {
            next(error)
        }

    }


    async addScore(req, res, next) {

        try {

            const { id } = req.params;
            await objectIdValidator.validateAsync({id});
            const data = req.body;
            const { score, refereeID } = await tableAddScoreSchemaValidator.validateAsync(data);
        
            const tableMatch = await this.findTableMatchByID(id)
          
            if (!tableMatch)
                throw createHttpError.BadRequest("جدول مسابقه ای با این مشخصات یافت نشد")
            await this.findReferee(refereeID);

            const refereeIsOnScoreTable = await this.RefereeIsExistInScoreTable(id,refereeID);
            

            const scoreTable = {refereeID,score}

            if (refereeIsOnScoreTable){
                
                const scoreTableUpdateResult = await TableMatchModel.updateOne({_id : id,"scoreTable.refereeID": refereeID },{

                    $inc : {"scoreTable.$.score" : score}

                })

                if (scoreTableUpdateResult.modifiedCount == 0)
                    throw createHttpError.InternalServerError("ثبت امتیاز با مشکل مواجه شد")

            }else{

                const scoreTableUpdateResult = await TableMatchModel.updateOne({_id : id},{

                    $push : {scoreTable }

                })

                if (scoreTableUpdateResult.modifiedCount == 0)
                    throw createHttpError.InternalServerError("ثبت امتیاز با مشکل مواجه شد")

            }

            return res.status(StatusCodes.OK).json(createMessage(StatusCodes.OK,"ثبت امتیاز با موفقیت انحام شد"))

        } catch (error) {
            next(error)
        }

    }

    async RefereeIsExistInScoreTable(tableID, refereeID) {

        const result = await TableMatchModel.findOne({ _id: tableID, "scoreTable.refereeID": refereeID })

        if (result)
            return true
        return false;

    }

    async findReferee(id) {
    
        const referee = await RefereeModel.findOne({ _id: id }, { __v: 0 })

        if (!referee)
            throw new createHttpError.BadRequest("داوری ای با این مشخصات یافت نشد")

        return referee;
    }
    async findTableMatchByID(id) {

        const tableMatch = await TableMatchModel.findOne({ _id: id })
     
        if (!tableMatch)
            return undefined;

        return tableMatch;

    }
    async findTableMatch(participantID, type) {

        const tableMatch = await TableMatchModel.findOne({ $and: [{ participantID }, { type }] })

        if (!tableMatch)
            return undefined;

        return tableMatch;

    }
    async findTableMatch(participantID, type) {

        const tableMatch = await TableMatchModel.findOne({ $and: [{ participantID }, { type }] })

        if (!tableMatch)
            return undefined;

        return tableMatch;

    }

    async findParticipant(id) {

        const participant = await ParticipantModel.findOne({ _id: id }, { __v: 0 })

        if (!participant)
            throw new createHttpError.BadRequest("شرکت کننده ای با این مشخصات یافت نشد")

        return participant;
    }

}



module.exports = { tableMatchController: new TableMatchController() }
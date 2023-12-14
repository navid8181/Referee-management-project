const createHttpError = require("http-errors");
const { ParticipantModel } = require("../../models/participant.model");
const { TableMatchModel } = require("../../models/tableMatch.model");
const { objectIdValidator } = require("../validators/public.validator");
const { tableMatchSchemaValidator } = require("../validators/tableMatch.validator");
const { StatusCodes } = require("http-status-codes")

const Controller = require("./Controller");
const { createMessage } = require("../../utils/responseMessage");

class TableMatchController extends Controller {


    async add(req,res,next){

        try {
            
            const {participantID} = req.params;
         
            const data  = req.body;
            const {type} =  await tableMatchSchemaValidator.validateAsync(data);

            await objectIdValidator.validateAsync({id : participantID});

          
            await this.findParticipant(participantID)

            const tableMatch = await this.findTableMatch(participantID,type)
        
            if (tableMatch)
                throw createHttpError.BadRequest("جدول مسابقه با این مشخصات از قبل ثبت شده است")


            await TableMatchModel.create({participantID,type});

            return res.status(StatusCodes.CREATED).json(createMessage(StatusCodes.CREATED,"جدول با موفقیت ثبت شد"))
            

        } catch (error) {
            next(error)
        }

    }


    // async add(req,res,next){

    //     try {
            
    //     } catch (error) {
    //         next(error)
    //     }

    // }


    async findTableMatch(participantID,type){

        const tableMatch = TableMatchModel.findOne({$and : [{participantID},{type}]})

        if (!tableMatch)
            return undefined;

        return tableMatch;

    }

    async findParticipant(id){

        const participant = await ParticipantModel.findOne({_id : id},{__v : 0})

        if (!participant)
            throw new createHttpError.BadRequest("شرکت کننده ای با این مشخصات یافت نشد")

        return participant;
    }

}



module.exports = {tableMatchController : new TableMatchController()}
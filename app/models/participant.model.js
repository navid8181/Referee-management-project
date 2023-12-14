const { default : mongoose } = require("mongoose");


const participantSchema = new mongoose.Schema({

    name : {type : String ,required : true},
    last_name :  {type : String ,required : true}   



})

module.exports = {ParticipantModel : mongoose.model("participant",participantSchema)}
const { default : mongoose } = require("mongoose");

const scoreTableSchema = new mongoose.Schema({

    refereeID :  {type : mongoose.Types.ObjectId ,required : true},
    score : {type : Number,default : 0}


})
const tableMatchSchema = new mongoose.Schema({

    participantID : {type : mongoose.Types.ObjectId ,required : true},
    type : {type : String,required :true},/* ژمیناستیک   ,جدو  ,رزمی ... */
    scoreTable :  {type : [scoreTableSchema] ,default : {}}   



})

module.exports = {TableMatchModel : mongoose.model("table-match",tableMatchSchema)}
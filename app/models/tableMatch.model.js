const { default : mongoose } = require("mongoose");

const scoreTableSchema = new mongoose.Schema({

    refereeID :  {type : mongoose.Types.ObjectId,ref : "referee" ,required : true},
    score : {type : Number,default : 0}


})
const tableMatchSchema = new mongoose.Schema({

    participantID : {type : mongoose.Types.ObjectId,ref : "participant" ,required : true},
    type : {type : String,required :true},/* ژمیناستیک   ,جدو  ,رزمی ... */
    scoreTable :  {type : [scoreTableSchema] ,required : false}   



})

module.exports = {TableMatchModel : mongoose.model("table-match",tableMatchSchema)}
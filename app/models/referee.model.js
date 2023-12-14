const { default : mongoose } = require("mongoose");


const refereeSchema = new mongoose.Schema({

    name : {type : String ,required : true},
    last_name :  {type : String ,required : true}   



})

module.exports = {RefereeModel : mongoose.model("referee",refereeSchema)}
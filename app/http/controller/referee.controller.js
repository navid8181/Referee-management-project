const Controller = require("./Controller");

class RefereeController extends Controller {

    add(req,res,next){
        try {
            

        } catch (error) {
            next(error)
        }
    }


}

module.exports = {refereeController : new RefereeController()}
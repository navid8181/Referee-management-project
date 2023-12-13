
function createMessage(statusCode = 200,message){

    return {
        statusCode,
        data : {
            message
        }
    }
}
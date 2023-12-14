
function createMessage(statusCode = 200, message = "") {

    return {
        statusCode,
        data: {
            message
        }
    }
}
function createDataMessage(statusCode = 200, _data = {}) {

    let propName;
    for (key in _data)
        propName = key;



    const message = {
        statusCode,
        data: {

        }

    }
    if (!propName)
        return message;

    message.data[propName] = _data[propName];
    return message;
}

module.exports = { createMessage,createDataMessage }
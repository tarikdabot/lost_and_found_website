// error.js
const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};
module.exports = errorHandler;  // This exports the function directly

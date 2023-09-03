const HTTP_ERRORS = require('./errorCodes');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_ERRORS.ERROR_SERVER;
  }
}

module.exports = ServerError;

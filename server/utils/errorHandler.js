const logger = require("./logger");

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  logger.error(error);

  return res
    .status(error.httpStatusCode || 400)
    .send({ message: error.message });
};

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  console.error(error);

  res.status(400).send({ message: error.message });
};

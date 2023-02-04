module.exports = (request, response) => {
  response.status(404).send({ message: "Unknown endpoint" });
};

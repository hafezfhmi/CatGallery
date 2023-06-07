const { createClient } = require("redis");
const logger = require("./logger");
const { REDIS_HOST, REDIS_PORT } = require("./config");

const redisClient = createClient({
  legacyMode: true,
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on("error", (err) => logger.error(err));

module.exports = { redisClient };

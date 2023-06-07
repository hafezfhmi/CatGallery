const http = require("http");
const dotenv = require("dotenv");
const { redisClient } = require("./utils/redis");

dotenv.config({ path: "./.env" });

const app = require("./app");
const db = require("./utils/database");
const logger = require("./utils/logger");
const { PORT } = require("./utils/config");

const server = http.createServer(app);

const shutdown = () => {
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

const initialize = async () => {
  try {
    await redisClient.connect();
    await db.sync();

    server.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Error during initialization:", error);
    process.exit(1);
  }
};

initialize();

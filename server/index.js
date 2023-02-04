const http = require("http");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = require("./app");
const db = require("./utils/database");
const logger = require("./utils/logger");
const { PORT } = require("./utils/config");

const server = http.createServer(app);

db.sync().then(() => {
  logger.info("Database synced");

  server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});

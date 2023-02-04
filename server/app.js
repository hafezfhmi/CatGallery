const express = require("express");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");

const authRouter = require("./routes/auth");
const imageRouter = require("./routes/image");
const userRouter = require("./routes/user");

const errorHandler = require("./utils/errorHandler");
const unknownEndpoint = require("./utils/unknownEndpoint");
const logger = require("./utils/logger");

const app = express();
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch((err) => logger.error(err));

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "cat",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/auth", authRouter);
app.use("/image", imageRouter);
app.use("/user", userRouter);

// Middlewares
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

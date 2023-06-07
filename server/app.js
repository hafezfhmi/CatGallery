const express = require("express");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const authRouter = require("./routes/auth");
const imageRouter = require("./routes/image");
const userRouter = require("./routes/user");

const errorHandler = require("./utils/errorHandler");
const unknownEndpoint = require("./utils/unknownEndpoint");
const { redisClient } = require("./utils/redis");

const app = express();

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
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Routes
app.use("/auth", authRouter);
app.use("/image", imageRouter);
app.use("/user", userRouter);

// Middlewares
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;

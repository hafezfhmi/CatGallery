const express = require("express");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");

const authRouter = require("./routes/auth");
const imageRouter = require("./routes/image");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");

const Image = require("./models/image");
const User = require("./models/user");
const PasswordReset = require("./models/passwordReset");
const LikeImage = require("./models/likeImage");
const Comment = require("./models/comment");
const LikeComment = require("./models/likeComment");

const app = express();
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

// Middleware
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
app.use("/comment", commentRouter);

// Associations/relationships
// user 1:M image
User.hasMany(Image, { foreignKey: "userId" });
Image.belongsTo(User, {
  foreignKey: "userId",
});
// user 1:1 passwordReset
User.hasOne(PasswordReset, { foreignKey: "userId" });
PasswordReset.belongsTo(User, { foreignKey: "userId" });
// user 1:M likeImage M:1 image
User.belongsToMany(Image, { through: LikeImage, foreignKey: "userId" });
Image.belongsToMany(User, { through: LikeImage, foreignKey: "imageId" });
// user 1:M comment
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });
// image 1:M comment
Image.hasMany(Comment, { foreignKey: "imageId" });
Comment.belongsTo(Image, { foreignKey: "imageId" });
// comment 1:M comment
Comment.hasMany(Comment, { foreignKey: "parentCommentId" });
Comment.belongsTo(Comment, { foreignKey: "parentCommentId" });
// user 1:M likeComment M:1 comment
User.belongsToMany(Comment, { through: LikeComment, foreignKey: "userId" });
Comment.belongsToMany(User, { through: LikeComment, foreignKey: "commentId" });

module.exports = app;

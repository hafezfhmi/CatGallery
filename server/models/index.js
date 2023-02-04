const Image = require("./image");
const User = require("./user");
const PasswordReset = require("./passwordReset");
const LikeImage = require("./likeImage");
const Comment = require("./comment");
const LikeComment = require("./likeComment");

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

module.exports = {
  Image,
  User,
  PasswordReset,
  LikeImage,
  Comment,
  LikeComment,
};

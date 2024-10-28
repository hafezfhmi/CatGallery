const sequelize = require("sequelize");
const { Comment, User, LikeComment } = require("../models");

const COMMENT_PAGE_LIMIT = 6;

const checkCommentNesting = async (parentCommentId) => {
  let level = 1;

  while (parentCommentId) {
    // eslint-disable-next-line no-await-in-loop
    const parentComment = await Comment.findOne({
      where: { id: parentCommentId },
    });

    // eslint-disable-next-line no-param-reassign
    parentCommentId = parentComment.parentCommentId;
    level += 1;
  }

  if (level > 3) {
    throw new Error("A parent can only have 3 level of nesting");
  }
};

exports.getCommentsByPage = async (req, res, next) => {
  let { imageId } = req.params;
  let parentCommentId = req.query.parentCommentId || null;
  let page = req.query.page || 1;

  parentCommentId =
    parentCommentId === "null" || parentCommentId === null
      ? null
      : Number.parseInt(parentCommentId, 10);
  page = Number.parseInt(page, 10);
  imageId = Number.parseInt(imageId, 10);

  try {
    if (Number.isNaN(imageId)) {
      throw new Error("Invalid imageId");
    }

    if (Number.isNaN(page) || page < 1) {
      throw new Error("Invalid page number");
    }

    if (Number.isNaN(parentCommentId) && parentCommentId !== null) {
      throw new Error("Invalid parentCommentId");
    }

    const toSkip = COMMENT_PAGE_LIMIT * (page - 1);

    let comments;

    if (req.session.isLoggedIn) {
      comments = await Comment.findAll({
        where: {
          imageId,
          parentCommentId,
        },
        attributes: {
          include: [
            [
              sequelize.literal(
                "(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id)",
              ),
              "likeCount",
            ],
            [
              sequelize.literal(
                `(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id AND likeComment.userId = ${req.session.user.id})`,
              ),
              "userLiked",
            ],
          ],
        },
        include: [
          { model: User, attributes: ["id", "username"] },
          {
            model: Comment,
            attributes: {
              include: [
                [
                  sequelize.literal(
                    "(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id)",
                  ),
                  "likeCount",
                ],
                [
                  sequelize.literal(
                    `(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id AND likeComment.userId = ${req.session.user.id})`,
                  ),
                  "userLiked",
                ],
              ],
            },
            include: [
              { model: User, attributes: ["id", "username"] },
              {
                model: Comment,
                attributes: {
                  include: [
                    [
                      sequelize.literal(
                        "(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id)",
                      ),
                      "likeCount",
                    ],
                    [
                      sequelize.literal(
                        `(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id AND likeComment.userId = ${req.session.user.id})`,
                      ),
                      "userLiked",
                    ],
                  ],
                },
                include: { model: User, attributes: ["id", "username"] },
                limit: COMMENT_PAGE_LIMIT,
              },
            ],
            limit: COMMENT_PAGE_LIMIT,
          },
        ],
        offset: toSkip,
        limit: COMMENT_PAGE_LIMIT,
      });
    } else {
      comments = await Comment.findAll({
        where: {
          imageId,
          parentCommentId,
        },
        attributes: {
          include: [
            [
              sequelize.literal(
                "(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id)",
              ),
              "likeCount",
            ],
          ],
        },
        include: [
          { model: User, attributes: ["id", "username"] },
          {
            model: Comment,
            attributes: {
              include: [
                [
                  sequelize.literal(
                    "(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id)",
                  ),
                  "likeCount",
                ],
              ],
            },
            include: [
              { model: User, attributes: ["id", "username"] },
              {
                model: Comment,
                attributes: {
                  include: [
                    [
                      sequelize.literal(
                        "(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id)",
                      ),
                      "likeCount",
                    ],
                  ],
                },
                include: { model: User, attributes: ["id", "username"] },
                limit: COMMENT_PAGE_LIMIT,
              },
            ],
            limit: COMMENT_PAGE_LIMIT,
          },
        ],
        offset: toSkip,
        limit: COMMENT_PAGE_LIMIT,
      });
    }

    return res.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
};

exports.postComment = async (req, res, next) => {
  let { imageId } = req.params;
  let { parentCommentId, detail } = req.body;

  imageId = Number.parseInt(imageId, 10);
  detail = detail.trim();
  parentCommentId =
    parentCommentId === null ? null : Number.parseInt(parentCommentId, 10);

  try {
    if (Number.isNaN(imageId)) {
      throw new Error("Invalid imageId");
    }

    if (Number.isNaN(parentCommentId) && parentCommentId !== null) {
      throw new Error("Invalid parentCommentId");
    }

    if (!detail) {
      throw new Error("Invalid comment");
    }

    await checkCommentNesting(parentCommentId);

    const userId = req.session.user.id;

    const createdComment = await Comment.create({
      detail,
      userId,
      imageId,
      parentCommentId,
    });

    createdComment.dataValues.user = {
      id: req.session.user.id,
      username: req.session.user.username,
    };
    createdComment.dataValues.likeCount = 0;
    createdComment.dataValues.userLiked = false;
    createdComment.dataValues.comments = [];

    return res.status(201).json(createdComment);
  } catch (error) {
    return next(error);
  }
};

exports.postLikeComment = async (req, res, next) => {
  let { commentId } = req.params;
  const userId = req.session.user.id;

  commentId = Number.parseInt(commentId, 10);

  try {
    // validate commentId
    if (Number.isNaN(commentId)) {
      throw new Error("Invalid commentId");
    }

    // Check if liked
    const userLikedCount = await LikeComment.count({
      where: { userId, commentId },
    });

    // If not like, create a new row
    if (!userLikedCount) {
      await LikeComment.create({ userId, commentId });

      return res.json({ message: "Comment liked" });
    }

    // else delete the row
    await LikeComment.destroy({
      where: {
        userId,
        commentId,
      },
    });

    return res.json({ message: "Comment unliked" });
  } catch (error) {
    return next(error);
  }
};

exports.patchComment = async (req, res, next) => {
  let { imageId, commentId } = req.params;
  let { detail } = req.body;

  imageId = Number.parseInt(imageId, 10);
  commentId = Number.parseInt(commentId, 10);
  detail = detail.trim();

  try {
    if (Number.isNaN(imageId)) {
      throw new Error("Invalid imageId");
    }

    if (Number.isNaN(commentId)) {
      throw new Error("Invalid commentId");
    }

    if (!detail) {
      throw new Error("Invalid comment");
    }

    // validate user
    // get the current comment from db to get the user because we can't rely on the user id from the frontend api request
    const comment = await Comment.findByPk(commentId);
    const userId = req.session.user.id;

    // check if comment user id match with user that make the request
    if (comment.userId !== userId) {
      throw new Error("You don't have the access to update the comment");
    }

    // update in db - return [no of rows updated, array of updated object (only in postgres)]
    await Comment.update({ detail }, { where: { id: commentId } });

    // get the updated comment to be returned
    const updatedComment = await Comment.findByPk(commentId);

    return res.status(201).json(updatedComment);
  } catch (error) {
    return next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  let { imageId, commentId } = req.params;

  imageId = Number.parseInt(imageId, 10);
  commentId = Number.parseInt(commentId, 10);

  try {
    // validate imageId, commentId
    if (Number.isNaN(imageId)) {
      throw new Error("Invalid imageId");
    }

    if (Number.isNaN(commentId)) {
      throw new Error("Invalid commentId");
    }

    // validate user
    // get the current comment from db to get the user because we can't rely on the user id from the frontend api request
    const comment = await Comment.findByPk(commentId);
    const userId = req.session.user.id;

    // check if comment user id match with user that make the request
    if (comment.userId !== userId) {
      throw new Error("You don't have the access to update the comment");
    }

    // delete
    await Comment.destroy({ where: { id: commentId } });

    return res.status(201).json({ message: "Comment deleted" });
  } catch (error) {
    return next(error);
  }
};

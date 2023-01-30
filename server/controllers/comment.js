const sequelize = require("sequelize");
const Comment = require("../models/comment");
const User = require("../models/user");

const commentPageLimit = 5;

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
  let { id: imageId } = req.params;
  let { parentCommentId, page, previousLength = 0 } = req.query;

  parentCommentId =
    parentCommentId === "null" ? null : Number.parseInt(parentCommentId, 10);
  page = Number.parseInt(page, 10);
  imageId = Number.parseInt(imageId, 10);
  previousLength = Number.parseInt(previousLength, 10);

  if (Number.isNaN(imageId)) {
    throw new Error("Invalid imageId");
  }

  if (Number.isNaN(page) || page < 1) {
    throw new Error("Invalid page number");
  }

  if (Number.isNaN(parentCommentId) && parentCommentId !== null) {
    throw new Error("Invalid parentCommentId");
  }

  if (Number.isNaN(previousLength)) {
    throw new Error("Invalid previousLength");
  }

  let extraCommentAmount;
  let toSkip;

  if (page === 1) {
    toSkip = 0;
    extraCommentAmount = 0;
  } else {
    const commentModulus = previousLength % 5;
    toSkip = commentPageLimit * (page - 1) - commentModulus;
    extraCommentAmount =
      commentModulus > 0 ? commentPageLimit - commentModulus : 0;
  }

  try {
    const commentList = await Comment.findAll({
      where: {
        imageId,
        parentCommentId,
      },
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id)"
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
                  "(SELECT COUNT(*) FROM likeComment WHERE likeComment.commentId = comment.id)"
                ),
                "likeCount",
              ],
            ],
          },
          include: { model: User },
          limit: commentPageLimit,
        },
      ],
      offset: toSkip,
      limit: commentPageLimit + extraCommentAmount,
    });

    return res.status(200).json(commentList);
  } catch (error) {
    return next(error);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const { detail } = req.body;
    let { parentCommentId, imageId } = req.body;

    parentCommentId =
      parentCommentId === null ? null : Number.parseInt(parentCommentId, 10);
    imageId = Number.parseInt(imageId, 10);

    if (!detail) {
      throw new Error("Invalid comment");
    }

    if (Number.isNaN(imageId)) {
      throw new Error("Invalid imageId");
    }

    if (Number.isNaN(parentCommentId) && parentCommentId !== null) {
      throw new Error("Invalid parentCommentId");
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
    createdComment.dataValues.likes = 0;

    return res.status(201).json(createdComment);
  } catch (error) {
    return next(error);
  }
};

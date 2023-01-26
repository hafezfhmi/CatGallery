const Comment = require("../models/comment");

exports.getAllComments = async (req, res, next) => {
  const { imageId } = req.params;

  try {
    const commentList = await Comment.findAll({
      where: { imageId },
      include: { all: true },
    });

    return res.status(200).json(commentList);
  } catch (error) {
    return next(error);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const { detail, imageId, parentCommentId } = req.body;

    const userId = req.session.user.id;

    const createdComment = await Comment.create({
      detail,
      userId,
      imageId,
      parentCommentId,
    });

    const newComment = await Comment.findOne({
      where: { id: createdComment.id },
      include: { all: true },
    });

    return res.status(201).json(newComment);
  } catch (error) {
    return next(error);
  }
};

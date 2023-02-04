const fs = require("fs");
const sequelize = require("sequelize");
const cloudinary = require("../utils/cloudinaryUpload");
const { Image, LikeImage, User } = require("../models");
const logger = require("../utils/logger");

const IMAGE_PAGE_LIMIT = 10;

exports.getImagesByPage = async (req, res, next) => {
  let page = req.query.page || 1;

  page = Number.parseInt(page, 10);

  try {
    if (Number.isNaN(page) || page < 1) {
      throw new Error("Invalid page number");
    }

    const toSkip = IMAGE_PAGE_LIMIT * (page - 1);

    const images = await Image.findAll({
      offset: toSkip,
      limit: IMAGE_PAGE_LIMIT,
    });

    return res.status(200).json(images);
  } catch (error) {
    return next(error);
  }
};

exports.getImage = async (req, res, next) => {
  let { imageId } = req.params;

  imageId = Number.parseInt(imageId, 10);

  try {
    if (Number.isNaN(imageId)) {
      throw new Error("Invalid imageId");
    }

    const imageDetails = await Image.findByPk(imageId, {
      attributes: {
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM likeImage WHERE likeImage.imageId = image.id)"
            ),
            "likeCount",
          ],
        ],
      },

      include: [{ model: User, attributes: ["id", "username"] }],
    });

    if (!imageDetails) {
      throw new Error("Image not found");
    }

    // get user liked
    if (req.session.isLoggedIn) {
      const userLikedCount = await LikeImage.count({
        where: { imageId, userId: req.session.user.id },
      });

      const userLiked = !!userLikedCount;

      imageDetails.dataValues.userLiked = userLiked;
    }

    return res.status(200).json(imageDetails);
  } catch (error) {
    return next(error);
  }
};

exports.postImage = async (req, res, next) => {
  const { title, description } = req.body;
  const { file } = req;

  try {
    if (!title) {
      throw new Error("Invalid title");
    }

    if (!file) {
      throw new Error("No image is inserted. Please upload an image");
    }

    const uploadedFile = await cloudinary.uploader.upload(file.path, {
      quality: 60,
      width: 2000,
      height: 1000,
      crop: "limit",
      folder: "catGallery/image",
    });

    fs.unlink(file.path, (err) => {
      if (err) {
        logger.error(err);
      }
    });

    const imageUrl = uploadedFile.secure_url;

    const createdImage = await Image.create({
      title,
      description,
      imageUrl,
      userId: req.session.user.id,
    });

    return res.status(201).json(createdImage);
  } catch (error) {
    return next(error);
  }
};

exports.postLikeImage = async (req, res, next) => {
  let { imageId } = req.params;
  const userId = req.session.user.id;

  imageId = Number.parseInt(imageId, 10);

  try {
    if (Number.isNaN(imageId)) {
      throw new Error("Invalid imageId");
    }

    // find if user liked
    const userLikedCount = await LikeImage.count({
      where: { userId, imageId },
    });

    // if not liked (doesn't exist), create
    if (!userLikedCount) {
      await LikeImage.create({ userId, imageId });

      return res.json({ message: "Image liked" });
    }

    // if exist, delete like
    await LikeImage.destroy({
      where: {
        userId,
        imageId,
      },
    });

    return res.json({ message: "Image unliked" });
  } catch (error) {
    return next(error);
  }
};

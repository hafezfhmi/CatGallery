const fs = require("fs");
const sequelize = require("sequelize");
const cloudinary = require("../utils/cloudinaryUpload");
const Image = require("../models/image");
const LikeImage = require("../models/likeImage");
const User = require("../models/user");

exports.getOneImage = async (req, res, next) => {
  let { id } = req.params;

  id = Number.parseInt(id, 10);

  try {
    if (Number.isNaN(id)) {
      throw new Error("Invalid imageId");
    }

    const image = await Image.findByPk(id, {
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

    return res.status(200).json(image);
  } catch (error) {
    return next(error);
  }
};

exports.getImagesByPage = async (req, res, next) => {
  let page = req.query.page || 1;

  page = Number.parseInt(page, 10);

  try {
    if (Number.isNaN(page) || page < 1) {
      throw new Error("Invalid page number");
    }

    const toSkip = 10 * (page - 1);

    const images = await Image.findAll({ offset: toSkip, limit: 10 });

    return res.status(200).json(images);
  } catch (error) {
    return next(error);
  }
};

exports.getUserLiked = async (req, res, next) => {
  let { id: imageId } = req.params;
  const userId = req.session.user.id;

  imageId = Number.parseInt(imageId, 10);

  try {
    if (Number.isNaN(imageId)) {
      throw new Error("Invalid imageId");
    }

    const likesAmount = await LikeImage.count({ where: { imageId, userId } });

    if (likesAmount) {
      return res.status(200).json({ liked: true });
    }

    return res.status(200).json({ liked: false });
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
        console.err(err);
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
  let { imageId } = req.body;
  const userId = req.session.user.id;

  imageId = Number.parseInt(imageId, 10);

  try {
    if (Number.isNaN(imageId)) {
      throw new Error("Invalid imageId");
    }

    // find likes
    const likeImage = await LikeImage.findOne({ where: { userId, imageId } });

    // if doesnt exist, create
    if (!likeImage) {
      await LikeImage.create({ userId, imageId });

      return res.json({ message: "Image liked" });
    }

    // if exist, delete
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

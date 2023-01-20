const fs = require("fs");
const cloudinary = require("../utils/cloudinaryUpload");
const Image = require("../models/image");
const LikeImage = require("../models/likeImage");

exports.getAllImages = async (req, res, next) => {
  try {
    const images = await Image.findAll();

    return res.status(200).json(images);
  } catch (error) {
    return next(error);
  }
};

exports.getOneImage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const image = await Image.findByPk(id);

    return res.status(200).json(image);
  } catch (error) {
    return next(error);
  }
};

exports.getImagesByPage = async (req, res, next) => {
  let page = req.query.page || 1;
  page = Number.parseInt(page, 10);

  if (Number.isNaN(page) || page < 1) {
    return res.status(422).json({ msg: "Page is not a valid number" });
  }

  const toSkip = 10 * (page - 1);

  try {
    const images = await Image.findAll({ offset: toSkip, limit: 10 });

    return res.status(200).json(images);
  } catch (error) {
    return next(error);
  }
};

exports.postImage = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { file } = req;

    if (!file) {
      return res
        .status(422)
        .json({ msg: "No image is inserted. Please upload an image." });
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
  const { imageId } = req.body;
  const userId = req.session.user.id;

  try {
    // find likes
    const likeImage = await LikeImage.findOne({ where: { userId, imageId } });

    // if doesnt exist, create
    if (!likeImage) {
      await LikeImage.create({ userId, imageId });

      return res.json({ msg: "Image liked" });
    }

    // if exist, delete
    await LikeImage.destroy({
      where: {
        userId,
        imageId,
      },
    });

    return res.json({ msg: "Image unliked" });
  } catch (error) {
    return next(error);
  }
};

exports.getLikesAmount = async (req, res, next) => {
  const { id: imageId } = req.params;

  try {
    const likesAmount = await LikeImage.count({ where: { imageId } });

    return res.status(200).json({ likesAmount });
  } catch (error) {
    return next(error);
  }
};

exports.getUserLiked = async (req, res, next) => {
  const { id: imageId } = req.params;
  const userId = req.session?.user?.id;

  if (!userId) {
    return res.status(200).json({ liked: false });
  }

  try {
    const likesAmount = await LikeImage.count({ where: { imageId, userId } });

    if (likesAmount) {
      return res.status(200).json({ liked: true });
    }

    return res.status(200).json({ liked: false });
  } catch (error) {
    return next(error);
  }
};

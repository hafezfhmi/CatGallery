const fs = require("fs");
const cloudinary = require("../utils/cloudinaryUpload");
const Image = require("../models/image");

exports.getAllImages = async (req, res, next) => {
  try {
    const images = await Image.findAll();

    return res.status(200).json(images);
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

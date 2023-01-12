const cloudinary = require("cloudinary").v2;
const Image = require("../models/image");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.postImage = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { file } = req;

    if (!file) {
      return res
        .status(422)
        .json({ msg: "No image is inserted. Please upload an image." });
    }

    await cloudinary.uploader.upload(file.path);

    const imageUrl = file.path;

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

const Image = require("../models/image");

exports.postImage = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { file } = req;

    if (!file) {
      return res
        .status(422)
        .json({ msg: "No image is inserted. Please upload an image." });
    }

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

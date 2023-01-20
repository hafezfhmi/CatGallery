const User = require("../models/user");

exports.getOneUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

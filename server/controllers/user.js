const User = require("../models/user");

exports.getOneUser = async (req, res, next) => {
  let { id } = req.params;

  id = Number.parseInt(id, 10);

  try {
    if (Number.isNaN(id)) {
      throw new Error("Invalid user id");
    }

    const user = await User.findByPk(id, {
      attributes: ["id", "username", "firstName", "lastName"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

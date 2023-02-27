const { User } = require("../models");

exports.getUser = async (req, res, next) => {
  let { userId } = req.params;

  userId = Number.parseInt(userId, 10);

  try {
    if (Number.isNaN(userId)) {
      throw new Error("Invalid user id");
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "firstName", "lastName"],
    });

    if (!user) {
      const error = new Error("User not found");
      error.httpStatusCode = 404;
      throw error;
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

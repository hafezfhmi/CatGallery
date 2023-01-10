module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res
      .status(401)
      .json({ msg: "You don't have the access. Please log in and try again." });
  }

  return next();
};

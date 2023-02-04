const router = require("express").Router();

const {
  getRelog,
  getResetPassword,
  postLogin,
  postLogout,
  postSignup,
  postResetPassword,
  postNewPassword,
} = require("../controllers/auth");
const isAuth = require("../utils/isAuth");

// STARTS WITH /auth
router.get("/relog", isAuth, getRelog);
router.get("/reset-password/:resetToken", getResetPassword);

router.post("/login", postLogin);
router.post("/logout", isAuth, postLogout);
router.post("/signup", postSignup);
router.post("/reset-password", postResetPassword);
router.post("/reset-password/:resetToken", postNewPassword);

module.exports = router;

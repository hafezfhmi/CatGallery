const router = require("express").Router();

const {
  getRelog,
  getOneResetPassword,
  postLogin,
  postLogout,
  postSignup,
  postResetPassword,
  postNewPassword,
} = require("../controllers/auth");
const isAuth = require("../utils/isAuth");

router.get("/relog", isAuth, getRelog);
router.get("/resetPassword/:resetToken", getOneResetPassword);

router.post("/login", postLogin);
router.post("/logout", isAuth, postLogout);
router.post("/signup", postSignup);
router.post("/resetPassword", postResetPassword);
router.post("/resetPassword/:resetToken", postNewPassword);

module.exports = router;

const router = require("express").Router();

const { postLogin, postLogout, postSignup } = require("../controllers/auth");

router.post("/login", postLogin);
router.post("/logout", postLogout);
router.post("/signup", postSignup);

module.exports = router;

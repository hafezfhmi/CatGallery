const router = require("express").Router();
const upload = require("../utils/fileUpload");

const { postImage } = require("../controllers/image");
const isAuth = require("../utils/isAuth");

router.post("/", isAuth, upload.single("file"), postImage);

module.exports = router;

const router = require("express").Router();
const upload = require("../utils/fileUpload");

const { postImage, getImagesByPage } = require("../controllers/image");
const isAuth = require("../utils/isAuth");

router.get("/", getImagesByPage);
router.post("/", isAuth, upload.single("file"), postImage);

module.exports = router;

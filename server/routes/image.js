const router = require("express").Router();
const upload = require("../utils/fileUpload");

const { postImage, getAllImages } = require("../controllers/image");
const isAuth = require("../utils/isAuth");

router.get("/", getAllImages);
router.post("/", isAuth, upload.single("file"), postImage);

module.exports = router;

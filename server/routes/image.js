const router = require("express").Router();
const upload = require("../utils/fileUpload");

const {
  postImage,
  getImagesByPage,
  getOneImage,
  postLikeImage,
  getLikesAmount,
  getUserLiked,
} = require("../controllers/image");
const isAuth = require("../utils/isAuth");

router.get("/", getImagesByPage);
router.get("/:id", getOneImage);
router.get("/:id/likesAmount", getLikesAmount);
router.get("/:id/userLiked", getUserLiked);
router.post("/", isAuth, upload.single("file"), postImage);
router.post("/likes", isAuth, postLikeImage);

module.exports = router;

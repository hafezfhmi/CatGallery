const router = require("express").Router();
const upload = require("../utils/fileUpload");

const {
  getOneImage,
  getImagesByPage,
  getUserLiked,
  postImage,
  postLikeImage,
} = require("../controllers/image");
const { getCommentsByPage, postComment } = require("../controllers/comment");
const isAuth = require("../utils/isAuth");

router.get("/", getImagesByPage);
router.get("/:id", getOneImage);
router.get("/:id/userLiked", isAuth, getUserLiked);
router.get("/:id/comments", getCommentsByPage);

router.post("/", isAuth, upload.single("file"), postImage);
router.post("/likes", isAuth, postLikeImage);
router.post("/:id/comments", isAuth, postComment);

module.exports = router;

const router = require("express").Router();

const {
  getImage,
  getImagesByPage,
  postImage,
  postLikeImage,
} = require("../controllers/image");
const {
  getCommentsByPage,
  postComment,
  postLikeComment,
  patchComment,
  deleteComment,
} = require("../controllers/comment");
const isAuth = require("../utils/isAuth");
const upload = require("../utils/fileUpload");

router.get("/", getImagesByPage);
router.get("/:imageId", getImage);
router.get("/:imageId/comments", getCommentsByPage);

router.post("/", isAuth, upload.single("file"), postImage);
router.post("/:imageId/like", isAuth, postLikeImage);
router.post("/:imageId/comment", isAuth, postComment);
router.post("/:imageId/comment/:commentId/like", isAuth, postLikeComment);

router.patch("/:imageId/comment/:commentId", isAuth, patchComment);

router.delete("/:imageId/comment/:commentId", isAuth, deleteComment);

module.exports = router;

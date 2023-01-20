const router = require("express").Router();

const { getAllComments, postComment } = require("../controllers/comment");
const isAuth = require("../utils/isAuth");

router.get("/:imageId", getAllComments);
router.post("/", isAuth, postComment);

module.exports = router;

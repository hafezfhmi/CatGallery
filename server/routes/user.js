const router = require("express").Router();

const { getUser, updateUser } = require("../controllers/user");

// router.get("/:userId", getUser);
router.route("/:userId").get(getUser).patch(updateUser);

module.exports = router;

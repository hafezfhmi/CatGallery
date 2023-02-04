const router = require("express").Router();

const { getUser } = require("../controllers/user");

router.get("/:userId", getUser);

module.exports = router;

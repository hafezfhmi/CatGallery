const router = require("express").Router();

const { getOneUser } = require("../controllers/user");

router.get("/:id", getOneUser);

module.exports = router;

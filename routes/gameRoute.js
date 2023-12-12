const express = require("express");
const gameController = require("../controller/gameController");
const router = express.Router();

// router.get("", blogController.blog_index);
router.post("", gameController.game_post);
module.exports = router;

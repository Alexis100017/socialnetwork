const express = require("express");
const router = express.Router();

// get api/posts
// this will be a public API
router.get("/", (req, res) => res.send("Posts route"));

module.exports = router;

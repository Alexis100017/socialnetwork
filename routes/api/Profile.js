const express = require("express");
const router = express.Router();

// get api/profile
// this will be a public API
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;

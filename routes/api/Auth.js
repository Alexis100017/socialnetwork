const express = require("express");
const router = express.Router();

// get api/auth
// this will be a public API
router.get("/", (req, res) => res.send("Auth route"));

module.exports = router;

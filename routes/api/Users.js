const express = require("express");
const router = express.Router();

// get api/users
// this will be a public API
router.get("/", (req, res) => res.send("user route"));

module.exports = router;

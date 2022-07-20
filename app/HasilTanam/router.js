var express = require("express");
var router = express.Router();
const { index, updateSuhu, getSuhu, postSuhu } = require("./controller");
const { isLoginAdmin } = require('../middleware/auth');
const multer = require("multer");
const os = require("os");

// PAGES
router.get("/",isLoginAdmin, index);

module.exports = router;
 
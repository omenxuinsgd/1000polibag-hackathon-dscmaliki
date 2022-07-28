var express = require("express");
var router = express.Router();
const { index  } = require("./controller");
//actionStatusLampu1, actionStatusLampu2, actionStatusPump1, actionStatusPump2, actionStatusControl
const { isLoginAdmin }= require('../middleware/auth'); 

/* GET home page. */
router.use(isLoginAdmin);
router.get("/", index);

module.exports = router;

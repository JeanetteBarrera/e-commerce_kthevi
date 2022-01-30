const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController")

router.get("/", controller.list);
router.get("/search", controller.search);


module.exports= router;
const express = require("express");
const router = express.Router();

const {index, login, signin, list} = require("../controllers/mainController");


router.get("/", index);

router.get("/login", login);

router.get("/signin", signin);

router.get("/products", list);


router.get("/products", (req, res) => {

    
})

module.exports = router;



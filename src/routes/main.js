const express = require("express");
const router = express.Router();
const db = require("../database/models")
const {index, login, signin, list} = require("../controllers/mainController");


router.get("/", index);

router.get("/login", login);

router.get("/signin", signin);

router.get("/products", list);


router.get("/main", (req, res) => {

    /* traigo todas las categorias y sus productos
    db.Category.findAll({
        include: [{association: 'products'}]
        })
        .then(categories => {
            res.send(categories)
        })
    */

   /* todos los productos con su categoria y variantes
    db.Product.findAll({
        include: [
            {association: 'category'},
            {association: 'variants'}
        ]
    })
    .then(products => {
        res.send(products)
    })
    */

   /* traigo todas los registros de la tabla rols*/
    /*db.Rol.findAll({
        include:[{association: 'users'}]
    })
        .then(data => {
            res.send(data)
        })
    */
    /* traigo todos los usuarios con su rol*/
    /* db.User.findAll({
            include:[{association: 'rol'}, {association: 'likes', include:[{association:"product"}]}]
        })
        .then(data => {
            res.send(data)
        })
    */
    db.Stock.findAll({
        include:[{association: "variant"},{association:"size"} ]
    })
        .then(stock => {
            res.send(stock)
        })        
            
            
    /*db.Like.findAll()
    .then(data => {
        res.send(data)
    })*/
})

module.exports = router;



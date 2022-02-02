const db = require("../database/models");
const fs = require("fs");
const { validationResult } = require('express-validator');

const controller = {
    index: (req, res) => {
        res.send("INDEX ADMIN")
    }, 
    listProducts: (req, res) => {
        /*res.send("LIST-PRODUCTS ADMIN")*/
        db.Product.findAll()
        .then(products => {
            res.render("admin/productList", {
                title: "List Products - ADMIN",
                products,
                session: req.session
            })
        })
    },
    paginacion : (req, res) => {

        const getPaginacion = (page, size) => {
            const limit = size ? +size : 5;
            const offset = page ? page * limit : 0;
            return {limit, offset};
            
        }
        const getPagiData = (data, page, limit) => {
            const {count: totalItems, rows: products} = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
            return {totalItems, products, totalPages, currentPage}
        }
        
        const { page, size } = req.query;
        const { limit, offset } = getPaginacion(page, size);

        /*http://localhost:3000/admin/products/paginacion?page=2 */
        console.log(limit)
        console.log(offset)
        db.Product.findAndCountAll({
            where: {status: true},
            limit: limit,
            offset: offset
        })
        .then(response => {
            const data = getPagiData(response,page, limit )
            res.render("admin/productList", {
                title: "List Products - ADMIN",
                data,
                session: req.session
            })
            
        })
    },
    search: (req, res) => {
        res.send("RESULTADO DE BUSQUEDA ADMIN")
    },
    createProduct: (req, res) => {
        res.render("admin/productCreate")
    },
    storeProduct: (req, res) => {
        let errors = validationResult(req)

        if(errors.isEmpty()) {
            const {name, price, discount, description, category, gender, tags, color } = req.body;
            
            db.Product.create({
                name, 
                price, 
                discount, 
                description, 
                status: true,  
                category_id: category, 
                gender: (gender) ? gender : "unisex", 
                tags: ""
            })
            .then(product => {
                for( let i=0; i < color.length; i++) {
                    db.Variant.create({
                        color: req.body.color[i],
                        image: "default-image.jpg",
                        product_id: product.id
                    })
                    .then(variant => {
                        let sizes = ["stockS", "stockM", "stockL", "stockXL"]
                        let stock = []

                        for(let j = 0; j < sizes.length; j++) {
                            let stockObject = {
                                product_id: product.id,
                                variant_id: variant.id,
                                size_id: j+1,
                                quantity: req.body[`${sizes[j]}`][i]
                            }
                            stock.push(stockObject);
                        }
                        db.Stock.bulkCreate(stock)
                        .then(() => {
                            res.redirect("admin/products")
                        })
                    })
                }
            })
        }
    },
    editProduct: (req, res) => {

        db.Product.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {association: "variants", include: [{association: "stock"}]}
            ]
        })
        .then(product => {
            db.Category.findAll()
            .then(categories => {
                res.render("admin/productEdit", {
                    categories,
                    product,
                    session : req.session,
                    title: "Product Edit - ADMIN"
                })
            })
        })
    }, 
    updateProduct: (req, res) => {

        res.send("ACTUALIZAR-DATOS-PRODUCTO ADMIN")
    }, 
    deleteProduct: (req, res) => {
        res.send("DELETE-PRODUCT ADMIN")
    }, 
    listCategories: (req, res) => {
        res.send("LISTADO DE CATEGORIAS ADMIN")
    },
    createCategory: (req, res) => {
        res.send("FORM CREATE-CATEGORIA ADMIN")
    }, 
    storeCategory: (req, res) => {
        res.send("GUARDAR-NUEVA-CATEGORIA ADMIN")
    }, 
    editCategory: (req, res) => {
        res.send("FORM EDIT-CATEGORIA ADMIN")
    }, 
    updateCategory: (req, res) => {
        res.send("ACTUALIZAR-CATEGORIA ADMIN")
    }, 
    deleteCategory: (req, res) => {
        res.send("DELETE CATEGORIA ADMIN")
    }, 
    listCustomers: (req, res) => {
        res.send("LISTADO DE CLIENTES/CUENTAS")
    }, 
    listUserAdmin: (req, res) => {
        res.send("LISTADO USUARIOS CON ROL ADMIN")
    }, 
    createUserAdmin: (req, res) => {
        res.send("FORM CREATE-USER ADMIN")
    }, 
    storeUserAdmin: (req, res) => {
        res.send("GUARDAR-NUEVO-USUARIO ADMIN")
    }, 
    editUserAdmin: (req, res) => {
        res.send("FORM EDIT-USER ADMIN")
    }, 
    updateUserAdmin: (req, res) => {
        res.send("ACTUALIZAR USER-DATOS-ADMIN")
    }, 
    deleteUserAdmin: (req, res) => {
        res.send("ELIMINAR USER ADMIN")
    }
}
module.exports= controller;
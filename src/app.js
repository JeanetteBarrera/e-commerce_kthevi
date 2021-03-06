const express = require("express");
const methodOverride = require('method-override');
const path = require('path');
const app = express(); // asigno a la variable app, express ejecutada
const PORT = 3000; //declaro una variable que almacenara el nro del puerto


/*====== MIDDLEWARES =======*/
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));


/*====== CONFIG. TEMPLATE ENGINE =======*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas


/*====== REQUIERO ROUTERS =======*/
let indexRouter = require("./routes/main");
let adminRouter = require('./routes/admin');
let productRouter = require('./routes/product');
let userRouter = require('./routes/user')

/*====== ENRUTADORES =======*/
app.use("/", indexRouter);
app.use('/admin', adminRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

/* ERROR 404 *//*
app.use((req, res, next) => {
    res.status(404).render('404-page')
})*/

app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT}`)
})

/*
COMANDOS PARA INSTALAR DEPENDENCIAS:
npm i ejs //instalo motor de plantilla ejs
== se debe realizar una configuración ==
app.set('view engine', 'ejs');
app.set('views', '/views');

npm i method-override --save //nos permite recibir información por los metodos PUT Y DELETE
== se debe realizar una configuración ==
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
*/
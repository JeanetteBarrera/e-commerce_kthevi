let controller = {
    list: (req, res) => {
        res.send("LISTADO DE PRODUCTOS")
    },
    search: (req, res) => {
        res.send("RESULTADO DE BUSQUEDA")
    }
}
module.exports= controller;
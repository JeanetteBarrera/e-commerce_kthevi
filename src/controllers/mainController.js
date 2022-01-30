let controller = {
    index: (req, res) => {
        res.render('home')
    }, 
    signin: (req, res) => {
        res.render("register")
    },
    login: (req, res) => {
        res.render("login")
    },
    list: (req, res) => {
        res.render("listProducts")
    }
}
module.exports= controller;
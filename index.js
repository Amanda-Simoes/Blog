const express = require('express')
const app = express()
const { urlencoded } = require("body-parser")
const connection = require("./database/database")

// Controller
const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")

// Model
const Article = require('./articles/Article')
const Category = require('./categories/Category')

// View engine
app.set('view engine','ejs')

// Static
app.use(express.static('public'))

// Body-parser
app.use(urlencoded({extended: false}))
app.use(express.json())

// Connection
connection.authenticate().then(() => {
    console.log("Conexão feita com sucesso")
}).catch((error) => {
    console.log(error)
})

// Route CategoriesController
app.use("/",categoriesController)

// Route ArticlesController
app.use("/",articlesController)

// Route
app.get("/",(req,res) => {
    
    Article.findAll().then(articles => {
        res.render("index",{articles: articles})
    })

})

// Port
app.listen(2000, () => {
    console.log("O servidor está ativo!")
})
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
    
    Article.findAll({
        order: [
            ["id", "DESC"]
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index",{articles: articles, categories: categories})
        })
    })

})

app.get("/:slug",(req,res) => {
    
    var slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){Category.findAll().then(categories => {
            res.render("article",{article: article, categories: categories})
        })
        }else{
            res.redirect("/")
        }
    }).catch(err => {
        red.redirect("/")
    })

})

app.get("/category/:slug",(req,res) => {
    var slug = req.params.slug 
    Category.findOne({
        where: {
            slug: slug 
        }, 
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index",{articles: category.articles, categories: categories})
            })
        }else{
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

// Port
app.listen(2000, () => {
    console.log("O servidor está ativo!")
})
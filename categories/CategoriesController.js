const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugify = require('slugify')
const { route } = require('../articles/ArticlesController')

router.get("/admin/categories/new",(req,res) => {
    res.render("admin/categories/new")
})

router.post("/categories/save",(req,res) => {

    var title = req.body.title
    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title),
        }).then(() => {
            res.redirect("/admin/categories")
        })
    }else{
        res.redirect("/admin/categories/new")
    }

})

router.get("/admin/categories",(req,res) => {

    Category.findAll().then(categories => {
        res.render("admin/categories/index",{categories: categories})
    })

})

router.post("/categories/delete",(req,res) => {
    
    var id = req.body.id
    if(id != undefined){
        Category.destroy({
            where:{
                id: id
            }
        }).then(() => {
            res.redirect("/admin/categories")
        }).catch(Error)
            console.log(Error)
    }else{
        res.redirect("/admin/categories")
    }
})

router.get("/admin/categories/edit/:id", (req,res) => {

    var id = req.params.id

    if(isNaN(id)){
        res.redirect("/admin/categories")
    }

    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render("admin/categories/edit",{category: category})
        }else{
            res.redirect("/admin/categories")
        }
    }).catch(err => {
        res.redirect("/admin/categories")
    })

})

module.exports = router
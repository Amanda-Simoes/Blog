const express = require('express')
const router = express.Router()

router.get("/categories",(req,res) => {
    res.send("Rota de categorias")
})

module.exports = router
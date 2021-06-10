const express = require('express')
const app = express()

app.get("/",(req,res) => {
    res.send("Bem vindo ao meu blog")
})

app.listen(2000, () => {
    console.log("O servidor está ativo!")
})
const express = require('express')
const app = express()
const { urlencoded } = require("body-parser")
const connection = require("./database/database")

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

// Route
app.get("/",(req,res) => {
    res.render("index")
})

// Port
app.listen(2000, () => {
    console.log("O servidor está ativo!")
})
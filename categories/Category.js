const Sequelize = require('sequelize')
const connection = require('../database/database')

const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false,
    }, slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.sync({force: false}) // Sincronizando com o banco

module.exports = Category
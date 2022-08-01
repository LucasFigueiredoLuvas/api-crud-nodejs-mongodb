/**Load modules in de application**/
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

/**Create the communication with JSON**/
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

/**Create routers**/
const personRouter = require('./routes/personRouter')

app.use('/person', personRouter)

app.get('/', (req, res) => {
    res.json({ msg: 'Rota / ok' })
})

const DB_USER = encodeURIComponent(process.env.DB_USER)
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

/**Connection with the database remotely**/ //Change the string bellow to your mongodb's link
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@nodejs-api-crud.7fdko.mongodb.net/?retryWrites=true&w=majority`)
    .then( () => {
        /**Create the server**/
        app.listen(3000)
        console.log('Server running *:3000')
    })
    .catch( (err) => console.log(err) )
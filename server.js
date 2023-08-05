const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')

const PORT = 3000

app.listen(PORT, (error) => {
    error ? constole.log(error) : console.log(`listening port ${PORT}`)
})

const createPath = (page) => path.resolve(__dirname, 'bookPageEjs', `${page}.ejs`)

app.use(express.static(__dirname+'/bookPage'))

app.get('/', (req, res) => {
    res.sendFile(createPath('index'))
})
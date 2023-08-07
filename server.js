const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')

const PORT = 4000

app.listen(PORT, (error) => {
    error ? constole.log(error) : console.log(`listening port ${PORT}`)
})

const createPath = (page) => path.resolve(__dirname, 'bookPageEjs', `${page}.ejs`)

app.use(express.static(__dirname+'/bookPageRef'))

let {PythonShell} = require('python-shell')

PythonShell.run("parse.py", null).then(messages=>{
    app.get('/', (req, res) => {
        res.render(createPath('index'), {messages})
    })
})
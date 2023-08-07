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

let pyOptions = {
    'mode':'json'
}

PythonShell.run("parse.py", pyOptions).then(messages=>{
    const textMes = messages[0]
    app.get('/', (req, res) => {
        res.render(createPath('index'), {textMes})
    })
})
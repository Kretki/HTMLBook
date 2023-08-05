const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3000

const server = http.createServer((req, res) =>{
    res.setHeader('Content-type', 'text/html')
    
    const createPath = (page) => path.resolve(__dirname, 'bookPage', `${page}.html`)

    let basePath = ''
    console.log(req.url)

    switch(req.url){
        case '/':
            basePath = createPath('index')
            res.statusCode = 200
            break;
        default:
            basePath = createPath('index')
            console.log("error")
            res.statusCode = 404
            break;
    }  

    fs.readFile(basePath, (err, data) => {
        if(err){
            console.log(err)
            res.statusCode = 500
            res.end()
        }
        else{
            res.write(data)
            res.end()
        }
    })
})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})
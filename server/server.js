const express = require('express')
const path = require('path')

const app = express()
const port = 80

app.use('/css',express.static(__dirname +'/../client/css'));

app.listen(port, () => {
    console.log(`Lancement du serveur sur le port ${port}`)
})


app.get("/", (req, res) =>{
    res.sendFile(path.resolve(__dirname + "/../client/index.html"))
})
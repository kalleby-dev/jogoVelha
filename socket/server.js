const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


http.listen(3000, function(){
    console.log("listening on port 3000")
})

//Envia a pagina para o cliente
app.get('/', (req, res)=>{
    //console.log("Sendding /index.html")
    res.sendFile(__dirname+'/index.html')
})


//Troca de dados
io.on('connection', (socket) =>{
    //console.log("New connection: ", socket.id)

    socket.on('msg', function(data){
        console.log(data)
        socket.broadcast.emit('msg', socket.id+" is connected")
    })
})





const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


http.listen(3000, function(){
    console.log("listening on port 3000")
})

//Envia a pagina para o cliente
app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.get('/game.js', (req, res)=>{
    res.sendFile(__dirname+'/game.js')
})
app.get('/style.css', (req, res)=>{
    res.sendFile(__dirname+'/style.css')
})



var n = 0
//Troca de dados
io.on('connection', (socket) =>{
    //console.log("New connection: ", socket.id)
    n += 1;
    if(n == 1){
        socket.emit('canplay', {"value": true})
        console.log("1 jogador")
    }

    socket.on('msg', function(data){
        console.log(data)
        socket.broadcast.emit('msg', socket.id+" is connected")
    })

    socket.on('play', function(data){
        socket.broadcast.emit('play', data)
        console.log(data)
    })
})




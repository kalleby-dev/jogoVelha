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
    socket.on('msg', function(data){
        console.log(data)
        socket.broadcast.emit('msg', socket.id+" is connected")
    })

    n += 1;
    if(n == 1){
        socket.emit('canplay', {"value": true})
        console.log("1 jogador")
    }


    socket.on('endturn', function(data){
        game.board = data["board"]
        
        if(game.checkWinner(game.turn)){
            io.sockets.emit("gameover", {"winner": game.turn, "board": game.board});
            return;
        }

        console.log(game.checkDraw())

        game.turn = game.simbols.change()

        let state = {"board": game.board, "turn": game.turn}
        socket.broadcast.emit('turn', state)
    })

})


const game = {
    board: Array(9),
    turn: null,

    simbols: {
        options: ['O', 'X'],
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1:0);
            return this.options[this.turn_index];
        }
    },

    //Define posibles winner sequences
    winComb: [
        [0,1,2], [3,4,5], [6,7,8], //Line
        [0,3,6], [1,4,7], [2,5,8], //Column
        [0,4,8], [2,4,6] //Diagonal
    ],

    checkDraw: function(){
        if(this.board.indexOf(''))
            return false;
        return true;
    },

    //Uses the winnwer sequence list to checks if are winners
    checkWinner: function(simbol){
        for(i in this.winComb){
            if ( this.board[ this.winComb[i][0]] == simbol &&
                this.board[ this.winComb[i][1]] == simbol &&
                this.board[ this.winComb[i][2]] == simbol ){
                
                return true;
            }
        }
    },
}

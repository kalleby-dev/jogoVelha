//Game
const game = {
    label: null,
    container: null,
    board: Array(9),
    gameover: false,

    simbols: {
        options: ['O', 'X'],
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1:0);
            return this.options[this.turn_index];
        }
    },
    winComb: [
        [0,1,2], [3,4,5], [6,7,8], //Line
        [0,3,6], [1,4,7], [2,5,8], //Column
        [0,4,8], [2,4,6] //Diagonal
    ],
    

    init: function(container_element, state_label){
        this.container = container_element;
        this.label = state_label;
    },
    
    //Game reset
    start: function(){
        this.board.fill('');
        this.gameover = false;
        this.draw();
    },

    display: function(text){
        this.label.innerText = text;
    },

    endGame: function(simbol){
        this.gameover = true
        this.display(`Winner: '${simbol}'!!`);
        console.log(`Winner: '${simbol}'!!`);
    },

    //Draw a board array into screen container
    draw: function (){
        let content = document.createElement("div");

        for(i in this.board){
            let box = document.createElement("div");
            box.setAttribute('class', 'box');
            box.setAttribute('onclick', `game.makePlay(${i})`);
            box.innerText = this.board[i];

            content.appendChild(box);
        }
        this.container.innerHTML = content.innerHTML;
    },

    checkWinner: function(simbol){
        for(i in this.winComb){
           if ( this.board[ this.winComb[i][0]] == simbol &&
                this.board[ this.winComb[i][1]] == simbol &&
                this.board[ this.winComb[i][2]] == simbol ){
                
                this.endGame(simbol);
                return true;
           }
        }
    },

    makePlay: function(pos){
        if(this.gameover) return;
        if(this.board[pos] != '') return;
        
        let simbol = this.simbols.options[ this.simbols.turn_index];
        this.board[pos] = simbol;
        this.draw();

        if(this.checkWinner(simbol)) return;

        simbol = this.simbols.change();
        this.display(`${simbol} - player turn`);
    }


}; 

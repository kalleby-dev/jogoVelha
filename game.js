const game = {
    label: null,
    container: null,
    board: Array(9),
    gameover: false,

    //Player system
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
    

    //Get default HTML elements
    init: function(container_element, state_label){
        this.container = container_element;
        this.label = state_label;
    },
    
    
    //Start a new game
    start: function(){
        this.board.fill('');
        this.gameover = false;
        this.draw();
    },


    //Set a winner and ends the game
    endGame: function(simbol){
        this.gameover = true
        this.display(`Winner: '${simbol}'!!`);
        console.log(`Winner: '${simbol}'!!`);
    },


    //Print a text on the screen
    display: function(text){
        this.label.innerText = text;
    },


    //Draw the board array into screen container
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


    //Uses the winnwer sequence list to checks if are winners
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


    //Do a player move in game
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

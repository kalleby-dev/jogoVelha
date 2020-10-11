const client = {
    socket: null,

    init: function(io, label){
        console.log("Iniciando client")
        
        this.socket = io;
       
        this.socket.on("connect", function(){
            console.log("conectado ao server - id: "+socket.id);
        });
    },

    send: function(string){
        this.socket.emit("msg", string);
    }
};
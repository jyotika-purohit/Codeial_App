module.exports.chatSockets = function(chatServer){
    let io = require('socket.io')(chatServer);

    io.sockets.on('connection',function(socket){

        console.log("New Connection received!",socket.id); 

        socket.on('disconnect',function(){
            console.log("Socket disconnected!");
        })

        socket.on('join_chat_room',function(data){

            console.log("Joined the chat room!",data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit("user_joined",data);
        });

        socket.on('send_message',function(data){
            io.in(data.chatroom).emit("receive_message",data);
        });

    });
}
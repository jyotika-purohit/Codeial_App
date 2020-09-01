class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // "io" is a global variable that is given to use by socket.io file & available as soon as we included the js file (https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js)
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
        
    }
    connectionHandler(){
        let self = this;
        
        

        this.socket.on('connect',function(){
            console.log("Connection Established using sockets!");

            self.socket.emit('join_chat_room',{
                user_email:self.userEmail,
                chatroom:'Codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log("User Joined!",data);
            });

        });

        $('#new-msg-send-btn').on('click',function(event){
            event.preventDefault();
            let message = $('#new-msg-input-box').val();

            if(message!=''){
                self.socket.emit('send_message',{
                    email:self.userEmail,
                    chatroom:'Codeial',
                    message:message
                });
            }
        });

        self.socket.on('receive_message',function(data){
            let newMessageDOM;
            if(data.email == self.userEmail){
                newMessageDOM = $(`<li class="my-message">
                <p>${data.message}<span>${data.email}</span></p>
                </li>`);
            }
            else{
                newMessageDOM = $(`<li class="not-my-message">
                <p>${data.message}<span>${data.email}</span></p>
                </li>`);
            }

            $('#message-list').append(newMessageDOM);
        })

        
    }
}
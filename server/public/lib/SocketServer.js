//**************************************************/
//***************** SOCKET.io  *********************/ 
//**************************************************/

// Management of the messages sent by the admin on the channel with broadcast of them to all the connected user ( students and admins )

async function StartChat(io) {

    io.on('connection', (socket) => {

        // when the admin emits 'new message', this listens and executes
        socket.on('new message', (data) => {

            //read user message
            UserName = socket.username;
            UserMsg = data;

            // ======================= TO DO ==============================
            // pseudo code to save conversation
            // var conversation = db.getConversation();
            // conversation.addMessage(data.message);
            // conversation.save();
            // ============================================================

            // broadcast the msg to all the clients connected ( to the same channel )
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
        });

        // send store messages when user is online ( or save it into a file on client side and load it as app is launched )

        socket.on('online', function (data) {

            socket.username = username;

            // ======================= TO DO ==============================
            // pseudo code to get messages and display to user on first load
            // var conversation = db.getConversation();
            // var messages = conversation.getLast10Messages();
            // messages.forEach(function(message) { 
            //     socket.emit('message', message);
            // });
            // ============================================================
        });
    });
}


// exports functions
module.exports = { StartChat };


//**************************************************/
//***************** SOCKET.io  *********************/ 
//**************************************************/

// Management of the messages sent by the admin on the channel with broadcast of them to all the connected user ( students and admins )

async function StartChat(io, MessageInstance) {

    console.log(" --> Socket launched ... ")

   

    io.on('connection', (socket) => {

        // when the admin emits 'new message', this listens and executes

        socket.on('new message',(data) => {

            //read user message data
            const UserName = socket.username;
            const UserMsg = data.content;
            const channel = data.channel;

            // ======================= STORES MESSAGES ==============================

            MessageInstance.addMsg(UserName, UserMsg, channel);

            // ======================================================================

            // broadcast the msg to all the clients connected ( to the same channel )
            socket.broadcast.emit(channel, {
                username: socket.username,
                content: UserMsg
            });
        });

        // send store messages when user is online ( or save it into a file on client side and load it as app is launched )

        socket.on('online', function (data) {

            socket.username = data.username;

            console.log("An user got connected")

        });
    });
}


// exports functions
module.exports = { StartChat };
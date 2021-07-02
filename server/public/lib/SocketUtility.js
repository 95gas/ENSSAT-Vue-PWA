//****************************************************************/
//***************** WEBSOCKET implementation *********************/ 
//****************************************************************/

// Management of the messages sent by the admin on the channel with broadcast of them to all the connected user ( students and admins )

async function StartChat(io, MessageInstance) {

    console.log(" --> Socket launched ... ")


    io.on('connection', (socket) => {

        // when the admin emits 'newMessage', this listens and executes

        socket.on('newMessage',(data) => {

            //read user message data
            const UserName = socket.username;
            const UserMsg = data.content;
            const channel = data.channel;
            const Date = data.date;
            const FullDate = data.FullDate;

            // ======================= STORE MESSAGES ==============================

            MessageInstance.addMsg(UserName, UserMsg, channel, Date, FullDate);

            // =====================================================================

            // broadcast the msg to all the clients connected
            socket.broadcast.emit("newMessage", data);
        });

        // reveal when a user is connected and save their name for the session
        socket.on('online', function (data) {

            socket.username = data.username;

            console.log("An user just got connected")
        });
    });
}


// exports functions
module.exports = { StartChat };
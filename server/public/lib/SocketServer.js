const conversation = require('./LowDbUtilities.js');

const fs = require('fs');


//**************************************************/
//***************** SOCKET.io  *********************/ 
//**************************************************/

// Management of the messages sent by the admin on the channel with broadcast of them to all the connected user ( students and admins )

async function StartChat(io) {

    // cretae database for storing the messages

    conversation.create().then(message => {
        MessageInstance = message;
    })

    io.on('connection', (socket) => {

        // when the admin emits 'new message', this listens and executes
        socket.on('new message', (data) => {

            //read user message
            UserName = socket.username;
            UserMsg = data;

            // ======================= STORES MESSAGES ==============================

            MessageInstance.addMsg(Username, UserMsg);

            // ======================================================================

            // broadcast the msg to all the clients connected ( to the same channel )
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
        });

        // send store messages when user is online ( or save it into a file on client side and load it as app is launched )

        socket.on('online', function (data) {

            socket.username = username;

            // ======================= DISPLAY OFFLINE MESSAGES ==============================

            fs.readFile('test.json', (err, data) => {
                if (err) throw err;
                let fullConversation = JSON.parse(data);

                // var messages = conversation.getLast10Messages();

                fullConversation.forEach(function(message) {  // TO TEST
                         socket.emit('message', message);
               });
            });

            // =================================================================================
        });
    });
}


// exports functions
module.exports = { StartChat };
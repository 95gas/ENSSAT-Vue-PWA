const conversation = require('./LowDbUtilities.js');

const fs = require('fs');


//**************************************************/
//***************** SOCKET.io  *********************/ 
//**************************************************/

// Management of the messages sent by the admin on the channel with broadcast of them to all the connected user ( students and admins )

async function StartChat(io) {

    console.log(" --> Socket launched ... ")

    // cretae database for storing the messages
    let fileName ='conversation.json';
    let path = 'public/Database/' + fileName;

    var MessageInstance;

    conversation.createDB(path).then(message => {
        MessageInstance = message;
    })

    io.on('connection', (socket) => {

        // when the admin emits 'new message', this listens and executes
        socket.on('channel1', (data) => {

            //read user message
            UserName = socket.username;
            UserMsg = data.message;

            console.log(UserMsg);
            console.log("socket is " + socket.username);

            // ======================= STORES MESSAGES ==============================

            MessageInstance.addMsg(UserName, UserMsg);

            // ======================================================================

            // broadcast the msg to all the clients connected ( to the same channel )
            socket.broadcast.emit('channel1', {
                username: socket.username,
                message: data.message
            });
        });

        // send store messages when user is online ( or save it into a file on client side and load it as app is launched )

        socket.on('online', function (data) {

            socket.username = data.username;

            console.log("An user got connected")

            console.log(socket.username);

            // ======================= DISPLAY OFFLINE MESSAGES ==============================

            /*fs.readFile('test.json', (err, data) => {
                if (err) throw err;

                let fullConversation = JSON.parse(data);

                // var messages = conversation.getLast10Messages();

                fullConversation.forEach(function(message) { 
                         socket.emit('message', message);
               });
            });*/

            // =================================================================================
        });
    });
}


// exports functions
module.exports = { StartChat };
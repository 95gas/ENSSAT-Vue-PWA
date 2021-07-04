//*************************************************************/
//******************* INITIALIZE SERVER **********************/ 
//************************************************************/

console.log("Server inialization... ");

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require("cors");                   // import cors

app.use(cors());                                // for cors requests
app.use(express.static("../app/public"));
app.use(express.json())                         // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// import config file
const config = require("./config.json")

// start server 
const server = app.listen(port, () => {
    console.log("Server listening at" + config.URL + port)
})


//******************************************************************************/
//***************** Retrieve and Update the Calendars DAILY ********************/
//******************************************************************************/
// In this section we download and update the calendars if we are connected to internet

// Import tools for stores the calendars
var calendarTools = require('./public/lib/UtilityCalendar.js');

// import package for checking if an internet connection exists
const checkInternetConnected = require('check-internet-connected');

// set options for the connection check
const configs = {
    timeout: 5000,      //timeout connecting to each try (default 5000)
    retries: 2,         //number of retries to do before failing (default 5)
    domain: 'google.com'//the domain to check the connection
}

// ===================================================================
// == RUN THE TASK DAILY AT 01:00 at Europe/Rome timezone
// ===================================================================

var cron = require('node-cron');

//           # ┌──────────── minute
//           # │ ┌────────── hour
//           # │ │ ┌──────── day of month
//           # │ │ │ ┌────── month
//           # │ │ │ │ ┌──── day of week
//           # │ │ │ │ │
//           # * * * * *
cron.schedule('0 1 * * *', () => {

    checkInternetConnected(configs)
        .then((result) => {

            console.log("Connection available");

            // ==================================================================
            // == FETCH and STORE ALL THE CALENDARS OF THE FACULTIES PER GROUP ==
            // ==================================================================

            // import database
            const databases = require('./public/Database/DB.json');

            databases.Faculty.forEach(faculty => {

                // retrieve name faculty
                const degree = faculty.Name;

                faculty.Groups.forEach(group => { // per each group of the faculty

                    // retrieve URL and name of the group
                    const URL = group.URL;
                    const fileName = group.Name;

                    // generate calendar for each group
                    const saveTo = "./public/calendars/" + degree + "/";
                    calendarTools.updateCalendar(URL, saveTo, fileName);
                });
            });
            // ================= END CALENDAR FETCH ====================

        }).catch((err) => {
            console.log("No connection", err);
        })
}, {
    scheduled: true,
    timezone: "Europe/Rome"
});
// ========================== END SCHEDULED TASK ============================



//**************************************************/
//***************** SOCKET.io  *********************/ 
//**************************************************/
// Management of the messages sent by the admin on the channel with the broadcast of them to all the connected user ( students and admins )

var SendReceiveMessages = require('./public/lib/SocketUtility.js');

const io = require('socket.io')(server,

    // option to allow requests from foreign server to this server
    {
        cors: {
            origin: true,
            methods: ["GET", "POST"]
        }
    }
);

// import database utility
const conversation = require('./public/lib/LowDbUtilities.js');

 // create database for storing the messages
 let fileName ='conversation.json';
 let path = 'public/Database/' + fileName;

 // initalize the instance for creating the database
 var MessageInstance;

 conversation.createDB(path).then(message => {

    // create the instance for the database created
    MessageInstance = message;

    // START WEBSOCKET
    SendReceiveMessages.StartChat(io, MessageInstance);

 })
// ====================== END SOCKET.io ======================


//************************************************************/
//********************** GET MESSAGES ***********************/
//***********************************************************/
app.get('/getMessages/:channel', (req, res) => {

    // retrieve url parameter
    const channel = req.params['channel'];

    // fetch messages from the database
    const JSONdata = MessageInstance.getMsgs(channel);

    // send data back to client
    res.json(JSONdata);
})
// ================== END GET MESSAGES ======================



//************************************************************/
//********************** GET CALENDAR ***********************/
//***********************************************************/
app.get('/schedule/:faculty/:group', (req, res) => {

    // retrieve url parameters
    const facultyIndex = parseInt(req.params['faculty']);
    const groupIndex = parseInt(req.params['group']);

    // import database
    const databases = require('./public/Database/DB.json');

    // fetch name faculty and group selected by the client
    const faculty = databases.Faculty[facultyIndex].Name;
    const group = databases.Faculty[facultyIndex].Groups[groupIndex].Name;

    // look for the file .ics with the selected schedule
    const fileName = group + ".ics";
    var pathCalendar = "./public/calendars/" + faculty + "/" + fileName;

    const path = require('path');
    var absolutePath = path.join(__dirname, pathCalendar);

    // send calendar back to the client
    res.sendFile(absolutePath, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent file:', fileName)
        }
    });
})
// ================== END GET CALENDAR =====================


//********************** visual feeedback for check whether the server is running ************************/
app.get('/', (req, res) => {
    res.send("Server launched .. ");
})
//******************* END visual feeedback for check whether the server is running ***********************/

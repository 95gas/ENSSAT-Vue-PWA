console.log("Server inialization... ");


//*************************************************************/
//******************* INITIALIZE SERVER **********************/ 
//************************************************************/

const express = require('express')
const app = express()
const port = 3001

// import cors
const cors = require("cors");

// use cors
app.use(cors());

app.use(express.static("../app/public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// start server 
const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


//**************************************************************************/
//***************** Retrieve and Update Calendars DAILY ********************/
//**************************************************************************/
// In this section we download and update the calendars if we are connected to internet

// Import tools for stores the calendars
var calendarTools = require('./public/lib/UtilityCalendar.js');

// import package for checking if an internet connection exists
const checkInternetConnected = require('check-internet-connected');

const configs = {
    timeout: 5000,      //timeout connecting to each try (default 5000)
    retries: 2,         //number of retries to do before failing (default 5)
    domain: 'google.com'//the domain to check DNS record of
}

// ===================================================================
// == RUN THE TASK DAILY AT 01:00 at Europe/Rome timezone
// ===================================================================

var cron = require('node-cron');

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



//**************************************************/
//***************** SOCKET.io  *********************/ 
//**************************************************/

// Management of the messages sent by the admin on the channel with broadcast of them to all the connected user ( students and admins )

var SendReceiveMessages = require('./public/lib/SocketUtility.js');

const io = require('socket.io')(server,

    // option to allow request from other server to communicate with this server
    {
        cors: {
            origin: true,
            methods: ["GET", "POST"]
        }
    }
);

const conversation = require('./public/lib/LowDbUtilities.js');

 // cretae database for storing the messages
 let fileName ='conversation.json';
 let path = 'public/Database/' + fileName;

 var MessageInstance;

 conversation.createDB(path).then(message => {
     MessageInstance = message;

     SendReceiveMessages.StartChat(io, MessageInstance);

 })

//************************************************************/
//********************** GET MESSAGES ***********************/
//***********************************************************/ 
app.get('/getMessages/:channel', (req, res) => {

    const channel = req.params['channel'];

    const JSONdata = MessageInstance.getMsgs(channel);

    res.json(JSONdata);
})



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
console.log("Server inialization... ");


//**************************************************/
//************ INITIALIZE APP **********************/ 
//**************************************************/

const express = require('express')
const app = express()
const port = 3001


//set the view engine as ejs
app.set('view engine', 'ejs');
app.set('views', '../app/views');
app.use(express.static("../app/public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// start server 
const server = app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


//*********************************************************/
//***************** Update schedule  *********************/ 
//********************************************************/

const config = require("./config.json");

// retrieve URL from .config file
const URL = config.URL;

var calendarTools = require('./public/lib/UtilityCalendar.js');

// check if internet connection exists
const checkInternetConnected = require('check-internet-connected');

const configs = {
    timeout: 5000, //timeout connecting to each try (default 5000)
    retries: 2,//number of retries to do before failing (default 5)
    domain: 'google.com'//the domain to check DNS record of
}

checkInternetConnected(configs)
    .then((result) => {

        console.log("Connection available");

        calendarTools.updateCalendar(URL);

        // ======================= TO DO ==============================
        // == retrieve all the single calendar for all the faculties ==
        // ============================================================

    }).catch((err) => {
        console.log("No connection", err);
    })



//**************************************************/
//***************** SOCKET.io  *********************/ 
//**************************************************/

// Management of the messages sent by the admin on the channel with broadcast of them to all the connected user ( students and admins )

const io = require('socket.io')(server);

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



//************************************************************/
//********************** GET schedule ***********************/ 
//***********************************************************/

app.get('/schedule:', (req, res) => {

    // retrieve schedule to load as url parameter
    const schedule = req.query.schedule;   // ..../schedule?schedule = info

    // look for the file .ics with the selected schedule to load -- > store it in a json file ( use .config.json )
    var fileSchedule;

    // ======================= TO DO ==============================
    // open file
    // retrieve schedule, if found, set fileSchedule
    // otherwise, ERROR
    // ============================================================


    // load and parse this file without blocking the event loop
    const events = ical.sync.parseFile(fileSchedule);

    // read schedule and display informational
    // send it to page
    for (const event of Object.values(events)) {
        console.log(
            'Summary: ' + event.summary +
            '\nDescription: ' + event.description +
            '\nStart Date: ' + event.start.toISOString() +
            '\n'
        );
    };
})


//************************************************************/
//********************** GET HOME PAGE **********************/ 
//***********************************************************/

app.get('/', (req, res) => {

    // display messeges sent by administration
    const user = req.query.user;

    // ======================= TO DO ==============================
    // check if user admin or not admin
    // if admin displays admin interface ( button to send messages)
    // ============================================================

    res.render ('index');
})


//************************************************************/
//********************** GET messages  **********************/ 
//***********************************************************/

// chat interface ( only read ) for the students is implemented client-side


// lowdb for files
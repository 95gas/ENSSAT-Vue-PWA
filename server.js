console.log("Server inialization... ");


//CREATE THE EXPRESS APP FOR CHATBOX MANAGEMENT (ADMIN PAGE)
const express = require('express')
const app = express()
const port = 3001


//set the view engine as ejs
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// listen 
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })

// retrieve  schedule from ENSSAT

// import ical
const ical = require('node-ical');

const config = require("./config.json");

// check if internet conncetion exist 
// do stuff in an async function if internet connction exists
;(async () => {

    // retrieve URL from .config file
    // e.g. URL = 'http://lanyrd.com/topics/nodejs/nodejs.ics'
    const URL = config.URL;

    // download and parse iCal from the web
    ical.async.fromURL('http://lanyrd.com/topics/nodejs/nodejs.ics', function(err, data) { 
        if (err) {
            console.error(err);
            process.exit(1);
        }
        // print on a file to make it available offline or update if it exists
        console.log(data);
    });
})


// load file
app.get('/schedule', (req, res) => {

    // retrieve schedule to load as url parameter
    const schedule = req.query.schedule;   // ..../schedule?schedule = info

    // look for the file .ics with the selected schedule to load -- > store it in a json file ( use .config.json )
    const fileSchedule ;

    // open file
    // retrieve schedule, if found, set fileSchedule
    // otherwise, ERROR
    
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


app.get('/news', (req, res) => {
    // display messeges sent by administration
    const user = req.query.user;   

    // check if user admin or not admin
    // if admin displays admin interface ( button to send messages)
    // otherwise user interface

})

app.post('/', (req, res) => {
    // send messages to all the people using the app on the channel

    // call socket function

})


// socket io 

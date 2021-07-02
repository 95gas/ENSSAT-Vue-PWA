//*********************************************************/
//***************** CALENDAR UTILITY *********************/ 
//********************************************************/
// tools for managing the ics files.


// import ical
const ical = require('node-ical');
const icalGenerator = require('ical-generator');


//************************* Fetch calendar function ***********************/
// download from URL and update the calendar that was previously downloaded

async function updateCalendar( URL, path, fileName ) {

    var fs = require('fs');

    // check path. If folder doesn't exist, create it'
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }

    // download from URL and save the calendar files
    ical.fromURL(URL, {}, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        else {

            // create the calendar instance
            const calendar = icalGenerator();

            // populate the calendar with the event fetched from the URL
            for (let k in data) {
                if (data.hasOwnProperty(k)) {
                    var ev = data[k];
                    if (data[k].type == 'VEVENT') {
                        calendar.createEvent({
                            start: ev.start,
                            end: ev.end,
                            summary: ev.summary,
                            description: ev.description,
                            location: ev.location
                        });
                    }
                }
            }

            // Store the calendar
            calendar.save(path + fileName + '.ics');   // if the file already exists, the function .save overwrites it.

            // print logs
            console.log('schedule for ' + fileName + '.ics updated and stored in ' + path);
        }
    });
};

// exports functions
module.exports = { updateCalendar};
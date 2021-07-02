//*********************************************************/
//***************** CALENDAR UTILITY *********************/ 
//********************************************************/

// tools for managing the calendar

// import ical
const ical = require('node-ical');
const icalGenerator = require('ical-generator');

//****************************************************************/
//***************** Fetch calendar function **********************/
//****************************************************************/

// download from URL or update the previous calendar previously downloaded

async function updateCalendar( URL, path, fileName ) {

    // check path. If folder doesn't exist, create it'
    var fs = require('fs');

    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }

    // retrieve Icalendar
    ical.fromURL(URL, {}, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        else {

            // store calendar
            const calendar = icalGenerator();

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

            calendar.save(path + fileName + '.ics');   // if the file already exists, the function .save overwrites it.
            console.log('schedule for ' + fileName + '.ics updated and stored in ' + path);
        }
    });
};

// exports functions
module.exports = { updateCalendar};
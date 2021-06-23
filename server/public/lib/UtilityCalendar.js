
// import ical
const ical = require('node-ical');
const icalGenerator = require('ical-generator');

//****************************************************************/
//***************** Fetch calendar function **********************/
//****************************************************************/

// download from URL or update the previous calendar previously downloaded

async function updateCalendar( URL ) {

    // retrieve Icalendar
    ical.fromURL(URL, {}, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        else {

            // store calendar
            const calendar = icalGenerator({ name: 'test' });

            for (let k in data) {
                if (data.hasOwnProperty(k)) {
                    var ev = data[k];
                    if (data[k].type == 'VEVENT') {
                        calendar.createEvent({
                            start: ev.start,   //ev.start.getDate()   //ev.start.getMonth()  //ev.start.toLocaleTimeString('en-GB')
                            end: ev.end,
                            summary: ev.summary,
                            description: ev.description,
                            location: ev.location
                        });
                    }
                }
            }

            calendar.save('./calendar.ics');   // if the file already exists, the function .save overwrites it.
        }
    });
};

function ParseCalendar (file){
return ical.sync.parseFile(file);
}

// exports functions
module.exports = { updateCalendar, ParseCalendar};
// Author: John DiTullio aka gankaskhan

// Import the moment routines
import('../momentify.js').then((module) => { dateroutines = module; });
// Set defaults for moment.js
moment.defaultFormat = "MM/DD/.YYYY h:mm:ss a";
// Set server time zone (PST or PDT)
var ServerTimeZone = (moment().isDST() ? "" : "");

// Import the moment routines
import('./rendtimer.js').then((module) => { Rend = module; });

// // Rend
// var RendInterval,
//     Rend = {
//         time: '',
//         timer: {
//             clear: () => { clearInterval(RendInterval); },
//             start: () => { RendInterval = setInterval(function () { $('#timeUntilRend').val(dateroutines.getDuration(Rend.time)); }, 1000); },
//         }
//     };

// Onyxia
var OnyTime,
    OnyInterval,
    Onyxia = {
        time: '',
        timer: {
            clear: () => { clearInterval(OnyInterval); },
            start: () => { OnyInterval = setInterval(function () { $('#timeUntilOny').val(dateroutines.getDuration(Onyxia.time)); }, 1000); },
        }
    };

// Nefarian
var NefTime,
    NefInterval,
    Nefarian = {
        time: '',
        timer: {
            clear: () => { clearInterval(NefInterval); },
            start: () => { NefInterval = setInterval(function () { $('#timerNef').val(dateroutines.getDuration(Nefarian.time)); }, 1000); },
        }
    };

// SongFlower
var SongflowerTime;
var SongflowerInterval;

// Page load event handler
$(document).ready(function () {
    // set timers (timeout prevents error when doing replace on string)
    function pasteeventhandler() {
        // Do we have text?
        if ($('#timerTextArea').val().trim().length > 0) {
            // Clear all existing intervals
            clearAllIntervals();
            // Do event handler
            setTimeout(function () { pasteEventHandler(); }, 1);
        }
    }
    // text area paste/change event handler
    $('#timerTextArea').on("paste change", pasteeventhandler);
});

// Handle parsing NovaWorldBuff string
function pasteEventHandler() {
    // Get string as array
    var timers = $('#timerTextArea').val().split("\n");
    // Rend
    var RendTimeText = getAmPmDateFriendly(timers[0].split("(")[1].split(' ')[0]);
    Rend.time = new moment(new Date(new Date(getDateAsString() + " " + RendTimeText + " PDT").toISOString()));
    Rend.timer.start(Rend.time); // Start the Rend timer
    // Onyxia
    var onyTimeText = getAmPmDateFriendly(timers[1].split("(")[1].split(' ')[0]);
    Onyxia.time = new moment(new Date(new Date(getDateAsString() + " " + onyTimeText + " PDT").toISOString()));
    Onyxia.timer.start();
    // Nefarian
    var nefTimeText = getAmPmDateFriendly(timers[2].split("(")[1].split(' ')[0]);
    Nefarian.time = new moment(new Date(new Date(getDateAsString() + " " + nefTimeText + " PDT").toISOString()));
    Nefarian.timer.start();
}

//#region Dates

// Returns date as a string (ex: "9/19/2020")
function getDateAsString(d) {
    var d = new Date();
    return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
}

// Add a space between time string and the am/pm indicator
// *** allows time that can be converted to Date obj *** 
function getAmPmDateFriendly(str) { return str.replace("am", " am").replace("pm", " pm"); }

//#endregion

// Handle clearing all current intervals that are running
function clearAllIntervals() {
    try {
        clearInterval(RendInterval);
        clearInterval(OnyInterval);
        clearInterval(NefInterval);
        clearInterval(SongflowerInterval);
    } catch (error) {
        return;
    }
}

/*
DEV NOTES:
i.  Server time is in Pacific Time
        a. PDT - active
        b. PST - starts 11/01/2020

ii. EXAMPLE NWB STRING:
        Rend: 2 hours 9 minutes. (9:00pm server time)
        Onyxia: 2 hours 39 minutes. (10:00pm server time)
        Nefarian: 5 hours 3 minutes. (11:00pm server time)
*/
function test() {
    $('#timerTextArea').val("Rend: 1 hour 53 minutes. (9:51pm server time)\r\nOnyxia: 4 hours 34 minutes. (10:32pm server time)\r\nNefarian: 6 hours 19 minutes. (11:16pm server time)").trigger("change");
}


// IDEA: Reminder for raid times
// IDEA: Warcraft logs ?
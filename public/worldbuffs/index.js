/*
Author: Gankaskhan (10.30.2020)
NOTES:
- Server time is in Pacific Time
    a. PDT - active
    b. PST - starts 11/01/2020

- NWB STRING EXAMPLE:
Rend: 2 hours 9 minutes. (9:00pm server time)
Onyxia: 2 hours 39 minutes. (10:00pm server time)
Nefarian: 5 hours 3 minutes. (11:00pm server time)

*/

// Import moment routines
import('./momentify.js').then((module) => { dateroutines = module; dateroutines.initMomentDefaults(); });

// Init characters to get log data for
var characters = { thrallsbro: [], gankaskhan: [] };
characters = [
    {
        name: "thrallsbro",
        logs: ''
    },
    {
        name: "gankaskhan",
        logs: ''
    }
];
// Get Warcraft Logs script and initialize data
import('./warcraftlogapi.js').then((module) => { warcraftlogsapi = module; getLogsForToons(); });

function getLogsForToons() {
    warcraftlogsapi.getCharacterParses('thrallsbro').then((data) => { characters.thrallsbro = data; });
    warcraftlogsapi.getCharacterParses('gankaskhan').then((data) => { characters.gankaskhan = data; });
}

var Rend;
import('./rendtimer.js').then((module) => { Rend = module.initRend(); });

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

var characters = [];

// Page load event handler
$(document).ready(function () {
    // set timers (timeout prevents error when doing replace on string)
    function pasteeventhandler() {
        // Do we have text?
        if ($('#timerTextArea').val().trim().length > 0) {
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
    if (!timers[0].split("(")[1].split(' ')[0].startsWith("No current")) {
        var RendTimeText = getAmPmDateFriendly(timers[0].split("(")[1].split(' ')[0]);
        // Is there a timer in the pasted text for Rend?
        Rend.time = new moment(new Date(new Date(getDateAsString() + " " + RendTimeText + " " + ServerTimeZone).toISOString()));
        Rend.timer.start(Rend.time); // Start the Rend timer
    } else {
        $('#timeUntilRend').val("--:--:--");
    }

    // Onyxia
    var onyTimeText = getAmPmDateFriendly(timers[1].split("(")[1].split(' ')[0]);
    Onyxia.time = new moment(new Date(new Date(getDateAsString() + " " + onyTimeText + " " + ServerTimeZone).toISOString()));
    Onyxia.timer.start();
    // Nefarian
    var nefTimeText = getAmPmDateFriendly(timers[2].split("(")[1].split(' ')[0]);
    Nefarian.time = new moment(new Date(new Date(getDateAsString() + " " + nefTimeText + " " + ServerTimeZone).toISOString()));
    Nefarian.timer.start();
}

// Returns date as a string (ex: "9/19/2020")
function getDateAsString(d) { var d = new Date(); return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear(); }
// Add a space between time string and the am/pm indicator
function getAmPmDateFriendly(str) { return str.replace("am", " am").replace("pm", " pm"); }

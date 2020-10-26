// Author: John DiTullio aka gankaskhan

// Globals
var RendTime;
var RendInterval;
var OnyTime;
var OnyInterval;
var NefTime;
var NefInterval;
var SongflowerTime;
var SongflowerInterval;


// Page load event handler
$(document).ready(function () {
    // Set defaults for moment.js
    moment.defaultFormat = "MM/DD/.YYYY h:mm:ss a";
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
    // Split each buff time into a string that can be used to parse a datetime object
    var RendTimeText = getAmPmDateFriendly(timers[0].split("(")[1].split(' ')[0]);
    // Set the date using Pacific Time
    RendTime = new Date(new Date(getDateAsString() + " " + RendTimeText + " PDT").toISOString());

    // Once per second, update text for Rend
    RendInterval = setInterval(function () {
        var now = new moment();
        RendTime = new moment(RendTime);
        // Display the result for Rend
        $('#timerRend').val(moment.duration(RendTime.diff(now)).humanize());
    }, 1000);

    var onyTimeText = getAmPmDateFriendly(timers[1].split("(")[1].split(' ')[0]);
    OnyTime = new Date(getDateAsString() + " " + onyTimeText + " PDT");
    // Once per second, update text for Rend
    OnyInterval = setInterval(function () {
        var now = new moment();
        OnyTime = new moment(OnyTime);
        // Display the result for Rend
        $('#timerOny').val(moment.duration(OnyTime.diff(now)).humanize());
    }, 1000);

    var nefTimeText = getAmPmDateFriendly(timers[2].split("(")[1].split(' ')[0]);
    NefTime = new Date(getDateAsString() + " " + nefTimeText + " PDT");
    // Once per second, update text for Rend
    NefInterval = setInterval(function () {
        var now = new moment();
        NefTime = new moment(NefTime);
        // Display the result for Rend
        $('#timerNef').val(moment.duration(NefTime.diff(now)).humanize());
    }, 1000);
}

//#region Dates

// Returns date as a string (ex: "9/19/2020")
function getDateAsString() {
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

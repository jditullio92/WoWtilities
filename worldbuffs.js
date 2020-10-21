// Author: John DiTullio aka gankaskhan
// Page load event handler
$(document).ready(function () {
    // set timers (timeout prevents error when doing replace on string)
    function pasteeventhandler() { setTimeout(function () { pasteEventHandler(); }, 1); }
    // text area paste/change event handler
    $('#timerTextArea').on("paste change", pasteeventhandler);
});

// Handle parsing NovaWorldBuff string
function pasteEventHandler() {
    // Get string as array
    timers = $('#timerTextArea').val().split("\n");

    for (timer of timers) {
        
    }


    // Split each buff time into a string that can be used to parse a datetime object
    var rendTimeText = timers[0].split("(")[1].split(' ')[0];
    rendTimeText = getAmPmDateFriendly(rendTimeText);
    rendTime = new Date(getDateAsString() + " " + rendTimeText + " PDT");

    // Update text for Rend
    $('#timerRend').val(getFormattedDateTimeAmPm(rendTime));

    var onyTimeText = timers[1].split("(")[1].split(' ')[0];
    onyTimeText = getAmPmDateFriendly(onyTimeText);
    onyTimeText = new Date(getDateAsString() + " " + onyTimeText + " PDT");

    // Update text for Onyxia
    $('#timerOny').val(onyTimeText);

    var nefTimeText = timers[2].split("(")[1].split(' ')[0];
    nefTimeText = getAmPmDateFriendly(nefTimeText);
    nefTimeText = new Date(getDateAsString() + " " + nefTimeText + " PDT");

    // Update text for Nefarian
    $('#timerNef').val(nefTimeText);
}

//#region Dates

// Returns date as a string (ex: "9/19/2020")
function getDateAsString() { var d = new Date(); return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear(); }

// Add a space between time string and the am/pm indicator
// *** allows time that can be converted to Date obj *** 
function getAmPmDateFriendly(str) { return str.replace("am", " am").replace("pm", " pm"); }

//#endregion

/*
EXAMPLE NWB STRING:
Rend: 2 hours 9 minutes. (1:00pm server time)
Onyxia: 2 hours 39 minutes. (1:31pm server time)
Nefarian: 5 hours 3 minutes. (3:54pm server time)
*/
function test() {
    $('#timerTextArea').val("Rend: 1 hour 53 minutes. (11:51am server time)\r\nOnyxia: 4 hours 34 minutes. (2:32pm server time)\r\nNefarian: 6 hours 19 minutes. (4:16pm server time)");
}

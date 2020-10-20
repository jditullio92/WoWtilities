// Author: John DiTullio aka gankaskhan

/*
EXAMPLE NWB STRING:
Rend: 1 hour 53 minutes. (11:51am server time)
Onyxia: 4 hours 34 minutes. (2:32pm server time)
Nefarian: 6 hours 19 minutes. (4:16pm server time)
*/

// Page load event handler
$(document).ready(function () {
    // text area paste/change event handler
    $('#timerTextArea').on("paste change", function () {
        // set timers (timeout prevents error when doing replace on string)
        setTimeout(function () { pasteEventHandler(); }, 1);
    });
});

// Handle parsing NovaWorldBuff string
function pasteEventHandler() {
    // Get string as array
    var timers = $('#timerTextArea').val().split("\n");

    // Split each buff time into a string that can be used to parse a datetime object
    var rendTimeText = timers[0].split("(")[1].split(' ')[0];
    rendTimeText = getAmPmDateFriendly(rendTimeText);
    rendTime = new Date(getDateAsString() + " " + rendTimeText + " PST");
    
    // Update text for Rend
    $('#timerRend').val(getFormattedDateTimeAmPm(rendTime));

    var onyTimeText = timers[1].split("(")[1].split(' ')[0];
    onyTimeText = getAmPmDateFriendly(onyTimeText);
    onyTimeText = new Date(getDateAsString() + " " + onyTimeText + " PST");
    
    // Update text for Onyxia
    $('#timerOny').val(onyTimeText);

    var nefTimeText = timers[2].split("(")[1].split(' ')[0];
    nefTimeText = getAmPmDateFriendly(nefTimeText);
    console.log("NOT SPECIFIED: " + new Date(getDateAsString() + " " + nefTimeText));
    console.log("PST SPECIFIED: " + new Date(getDateAsString() + " " + nefTimeText+ " PST"));
    
    nefTimeText = new Date(getDateAsString() + " " + nefTimeText + " PST");
    
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

// dev codes
function test() {
    $('#timerTextArea').val("Rend: 1 hour 53 minutes. (11:51am server time)\r\nOnyxia: 4 hours 34 minutes. (2:32pm server time)\r\nNefarian: 6 hours 19 minutes. (4:16pm server time)");
}

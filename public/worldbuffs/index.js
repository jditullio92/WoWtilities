// Author: John DiTullio aka gankaskhan

// Page load event handler
$(document).ready(function () {
    // set timers (timeout prevents error when doing replace on string)
    function pasteeventhandler() {
        if ($('#timerTextArea').val().trim().length > 0) {
            setTimeout(function () { pasteEventHandler(); }, 1);
        }
    }
    // text area paste/change event handler
    $('#timerTextArea').on("paste change", pasteeventhandler);

    // console.log(getNow());

});

// Get time until buff (countdown timer)
var countdownTimer = function (time, element) {
    setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();
        var buffTime = new Date(time).getTime();
        var distance = buffTime - now;

        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        // Display the result in the element with id="demo"
        $(element).val(hours + ":" + minutes);
    }, 1000)
};

// Handle parsing NovaWorldBuff string
function pasteEventHandler() {
    // Get string as array
    var timers = $('#timerTextArea').val().split("\n");

    // Split each buff time into a string that can be used to parse a datetime object
    var rendTimeText = timers[0].split("(")[1].split(' ')[0];
    rendTimeText = getAmPmDateFriendly(rendTimeText);
    rendTime = new Date(getDateAsString() + " " + rendTimeText + " PDT");

    countdownTimer(rendTime, $('#timerRend'));

    // Update text for Rend
    // $('#timerRend').val(getFormattedDateTimeAmPm(rendTime));

    var onyTimeText = timers[1].split("(")[1].split(' ')[0];
    onyTimeText = getAmPmDateFriendly(onyTimeText);
    onyTimeText = new Date(getDateAsString() + " " + onyTimeText + " PDT");
    // Update text for Onyxia
    $('#timerOny').val(getFormattedDateTimeAmPm(onyTimeText));

    var nefTimeText = timers[2].split("(")[1].split(' ')[0];
    nefTimeText = getAmPmDateFriendly(nefTimeText);
    nefTimeText = new Date(getDateAsString() + " " + nefTimeText + " PDT");
    // Update text for Nefarian
    $('#timerNef').val(getFormattedDateTimeAmPm(nefTimeText));
}

//#region Dates

// Returns date as a string (ex: "9/19/2020")
function getDateAsString() { var d = new Date(); return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear(); }

// Add a space between time string and the am/pm indicator
// *** allows time that can be converted to Date obj *** 
function getAmPmDateFriendly(str) { return str.replace("am", " am").replace("pm", " pm"); }

//#endregion

/*
DEV NOTES:
i.  Server time is in Pacific Time
        a. PDT - active
        b. PST - starts 11/01/2020

ii. EXAMPLE NWB STRING:
        Rend: 2 hours 9 minutes. (1:00pm server time)
        Onyxia: 2 hours 39 minutes. (1:31pm server time)
        Nefarian: 5 hours 3 minutes. (3:54pm server time)
*/
function test() {
    $('#timerTextArea').val("Rend: 1 hour 53 minutes. (11:51am server time)\r\nOnyxia: 4 hours 34 minutes. (2:32pm server time)\r\nNefarian: 6 hours 19 minutes. (4:16pm server time)");
    $('#timerTextArea').trigger("change");
}

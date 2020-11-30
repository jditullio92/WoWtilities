/*
Author: Gankaskhan (10.30.2020)
NWB STRING EXAMPLE:
Rend: 2 hours 9 minutes. (9:00pm server time)
Onyxia: 2 hours 39 minutes. (10:00pm server time)
Nefarian: 5 hours 3 minutes. (11:00pm server time)
*/

// Global(s) - DateTimes
let momentify, ServerTimeZone;
// Global(s) - Timer Objects
let Rend, Onyxia, Nefarian;
// Global(s) - Character List
let characters = { thrallsbro: [], gankaskhan: [] };
let Zones = [];

// Import moment/datetime routines
import('./momentify.js').then((module) => { momentify = module; momentify.initMomentDefaults(); });
// Get Warcraft Logs script and initialize data
import('./warcraftlogapi.js').then((module) => { getLogsForToons(module); });

// Initialize world buff timer objects
import('./rendtimer.js').then((module) => { Rend = module.initRend(); });
import('./onyxiatimer.js').then((module) => { Onyxia = module.initOnyxia(); });
import('./nefariantimer.js').then((module) => { Nefarian = module.initNefarian(); });

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

    // Nav-Tab event handler
    $('a[data-toggle="tab"]').on('shown.bs.tab', async function (e) {
        // warcraft logs tab
        if (e.target.hash === "#tab-warcraftlogs") {
            // Create the table body elements from data
            let html = await createTableLogsBody("thrallsbro");
            // Set content for <tbody>
            $('#table-logs-body').html(html);
        }
    });

    // Set default server timezone
    ServerTimeZone = (moment().isDST() ? "PDT" : "PST");
});

// Fetch warcraftlogs data for characters
function getLogsForToons(module) {
    warcraftlogsapi = module;
    warcraftlogsapi.getZones().then((data) => { Zones = data; });
    warcraftlogsapi.getCharacterParses('thrallsbro').then((data) => { characters.thrallsbro = data; });
    warcraftlogsapi.getCharacterParses('gankaskhan').then((data) => { characters.gankaskhan = data; });
}

// Create table-log tbody elements from character data
async function createTableLogsBody(charName) {
    let html = '';
    // Does the character exist in the global list?
    if (!!characters[charName]) {
        let logdata = characters[charName];
        for (encounter of logdata) {
            html += '<tr>' +
                '<td>' + Math.ceil(encounter.percentile) + '% </td>' +
                '<td>' + encounter.ilvlKeyOrPatch + '</td>' +
                '</tr>';
        }
    }
    return html;
}

// Handle parsing NovaWorldBuff string
function pasteEventHandler() {
    // Get string as array
    let timers = $('#timerTextArea').val().split("\n");

    const timerIsEmpty = (time) => {
        let result = (time.split("(")[1].split(' ')[0].startsWith("No current"));
        return result;
    };

    // Rend
    // if (!timers[0].split("(")[1].split(' ')[0].startsWith("No current")) {
    if (!timerIsEmpty(timers[0])) {
        let RendTimeText = getAmPmDateFriendly(timers[0].split("(")[1].split(' ')[0]);
        // Is there a timer in the pasted text for Rend?
        Rend.time = new moment(new Date(new Date(getDateAsString() + " " + RendTimeText + " " + ServerTimeZone).toISOString()));
        Rend.timer.start(Rend.time); // Start the Rend timer
    } else {
        $('#timeUntilRend').val("No Current Timer...");
    }

    // Onyxia
    if (!timerIsEmpty(timers[1])) {
        let onyTimeText = getAmPmDateFriendly(timers[1].split("(")[1].split(' ')[0]);
        Onyxia.time = new moment(new Date(new Date(getDateAsString() + " " + onyTimeText + " " + ServerTimeZone).toISOString()));
        Onyxia.timer.start();
    } else {

    }

    // Nefarian
    if (!timerIsEmpty(timers[2])) {
        let nefTimeText = getAmPmDateFriendly(timers[2].split("(")[1].split(' ')[0]);
        Nefarian.time = new moment(new Date(new Date(getDateAsString() + " " + nefTimeText + " " + ServerTimeZone).toISOString()));
        Nefarian.timer.start();
    } else {

    }
}

// Returns date as a string (ex: "9/19/2020")
function getDateAsString(d) { var d = new Date(); return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear(); }
// Add a space between time string and the am/pm indicator
function getAmPmDateFriendly(str) { return str.replace("am", " am").replace("pm", " pm"); }

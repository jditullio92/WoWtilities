/*
Author: Gankaskhan (10.30.2020)
NWB STRING EXAMPLE:
Rend: 2 hours 9 minutes. (9:00pm server time)
Onyxia: 2 hours 39 minutes. (10:00pm server time)
Nefarian: 5 hours 3 minutes. (11:00pm server time)
*/

//#region Moment
let momentify, ServerTimeZone;
// Import moment/datetime routines
import('./momentify.js').then((module) => {
    momentify = module;
    momentify.initMomentDefaults();
    // Set default server timezone
    ServerTimeZone = (moment().isDST() ? "PDT" : "PST");
});
//#endregion

//#region WarcraftLogs
// Create a new {character}
const char = () => {
    return { parses: '', rankings: '' }
};
let characters = { thrallsbro: char(), gankaskhan: char() };
let Zones = [];
// Import warcraft logs api script and initialize data
import('./warcraftlogapi.js').then(async (module) => {
    warcraftlogsapi = module;
    Zones = await warcraftlogsapi.getZones();
    setZoneOptions(Zones);
});
function setZoneOptions(zones) {
    let html = '';
    for (let zone of zones) {
        html += `<option value="${zone.id}">${zone.name}</option>`;
    }
    $('#selZone').append(html);
}
//#endregion

//#region WorldBuffTimers
let Rend, Onyxia, Nefarian;
// Initialize world buff timer objects
import('./rendtimer.js').then((module) => { Rend = module.initRend(); });
import('./onyxiatimer.js').then((module) => { Onyxia = module.initOnyxia(); });
import('./nefariantimer.js').then((module) => { Nefarian = module.initNefarian(); });
//#endregion

// Page load event handler
$(document).ready(async function () {
    // text area paste/change event handler
    $('#timerTextArea').on("paste change", function () {
        // Do we have text?
        if ($(this).val().trim().length > 0) {
            // Do event handler
            setTimeout(function () { pasteEventHandler(); }, 1);
        }
    });

    // Nav-Tab event handler
    $('a[data-toggle="tab"]').on('shown.bs.tab', async function (e) {
        if (e.target.hash === "#tab-warcraftlogs") {
            await logtableTargetChange();
            $('#selCharacter').focus();
        }
    });

    $("#selCharacter").on("change", async function (e) {
        await logtableTargetChange();
    });

    // Setup options for #loadingModal
    $(document).ajaxStart(function () {
        $('#loadingModal').modal('show');
    });

    $(document).ajaxStop(function () {
        $('#loadingModal').modal('hide');
    });

    $('.btn>input[name="tabletype"]').on("click", async function () {
        // Get the selected option's value
        let target = $("#selCharacter option:selected").val();
        // Generate table body
        await createTableLogsBody(target);
    });
});

async function logtableTargetChange() {
    // Get the selected option's value
    let target = $("#selCharacter option:selected").val();
    // If not empty fill table with their
    if (target.length > 0) {
        // If no parses or rankings for character then get it
        if (characters[target].parses === '' || characters[target].rankings === '') {
            let options = { zone: Zones[6].id };
            characters[target] = await warcraftlogsapi.getCharacterData(target, options);
        }
        // Generate table body
        await createTableLogsBody(target);
    }
    return;
}

// Create table-log tbody elements from character data
async function createTableLogsBody(character) {
    let html = '';
    // Does the character exist in the global list?
    if (!!characters[character]) {
        let tabletype = $('.btn.active>input[name="tabletype"]')[0].value;
        let chardata = characters[character][tabletype];
        // Create table elements from data
        for (let encounter of chardata) {
            html += `<tr>` +
                `<td>${encounter.encounterName}</td>` +
                `<td>${parseFloat(encounter.percentile).toPrecision(4)}%</td>` +
                `<td>${parseFloat(encounter.total).toPrecision(5)}</td>` +
                `<td>${moment(encounter.startTime).format().split(" ")[0]}</td>` +
                `</tr>`;
        }
    }
    $('#table-logs-body').html(html);
    $('#table-logs').removeClass("d-none");
    return;
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
    if (!timerIsEmpty(timers[0])) {
        let RendTimeText = getAmPmDateFriendly(timers[0].split("(")[1].split(' ')[0]);
        Rend.time = new moment(new Date(new Date(getDateAsString() + " " + RendTimeText + " " + ServerTimeZone).toISOString()));
        Rend.timer.start(Rend.time);
    } else {
        Rend.element.value = "No Current Timer";
        // $('#timeUntilRend').val("No Current Timer...");
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

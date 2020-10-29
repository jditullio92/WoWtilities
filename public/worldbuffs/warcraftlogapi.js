// Warcraft Logs Api (v1) URL
const apiUrl = "https://classic.warcraftlogs.com:443/v1";
// Api key associated w/ my account
const apiKey = "f5419b12c6f4ad49d9ee69874a61b0c2";

var toons = {
    thrallsbro: '',
    gankaskhan: ''
};

// Get a character's parse data
// Example: https://classic.warcraftlogs.com:443/v1/parses/character/thrallsbro/fairbanks/US?api_key=f5419b12c6f4ad49d9ee69874a61b0c2
function getToonParses(character) {
    $.ajax({
        type: "GET",
        dataType: "application/json",
        url: apiUrl + '/parses/character/' + character + '/fairbanks/US?api_key=' + apiKey,
        data: {},
        crossOrigin: true,
        error: function (err) { },
        complete: function (data) {
            storeToonParseData(character, JSON.parse(data.responseText));
            // storeThrallsbroParses(JSON.parse(data.responseText));
        }
    });
}

function storeToonParseData(charname, data) {
    toons[charname] = data;
    console.log(toons[charname]);
}

function storeThrallsbroParses(data) { thrallsbro = data; }
function storeThrallsbroParses(data) { gankaskhan = data; }
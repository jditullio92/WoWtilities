// Example: https://classic.warcraftlogs.com:443/v1/parses/character/thrallsbro/fairbanks/US?api_key=f5419b12c6f4ad49d9ee69874a61b0c2
export function getToonParses(character) {
    // Warcraft Logs Api (v1) URL
    const apiUrl = "https://classic.warcraftlogs.com:443/v1";
    // Api key associated w/ my account
    const apiKey = "f5419b12c6f4ad49d9ee69874a61b0c2";

    $.ajax({
        type: "GET",
        dataType: "json",
        url: apiUrl + '/parses/character/' + character + '/fairbanks/US?api_key=' + apiKey,
        data: {},
        crossOrigin: true,
        success: function (data) {
            if (data) toons[character] = data;
        },
        error: function (err) {
            console.log("error getting parse data for " + character);
        }
    });
}

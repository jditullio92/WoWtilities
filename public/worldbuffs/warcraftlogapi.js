// Warcraft Logs Api (v1) 
// api docs: https://classic.warcraftlogs.com/v1/docs/
const ApiUrl = "https://classic.warcraftlogs.com:443/v1";
const ApiKey = "f5419b12c6f4ad49d9ee69874a61b0c2";

// ex: https://classic.warcraftlogs.com:443/v1/zones?api_key=API_KEY
export async function getZones() {
    let result;
    try {
        result = await $.ajax({
            type: "GET",
            crossOrigin: true,
            dataType: "json",
            url: ApiUrl + '/zones?api_key=' + ApiKey
        });
    } catch (error) {
        console.error(error);
    }
    return result;
}

// ex: https://classic.warcraftlogs.com:443/v1/parses/character/thrallsbro/fairbanks/US?api_key=API_KEY
export async function getCharacterParses(options) {
    let result;
    try {
        result = await $.ajax({
            type: "GET",
            crossOrigin: true,
            dataType: "json",
            url: ApiUrl + '/parses/character/' + options.character + '/fairbanks/US?zone=' + options.zone + '&api_key=' + ApiKey
        });
    } catch (error) {
        console.error(error);
    }
    return result;
}

// ex: https://classic.warcraftlogs.com:443/v1/rankings/character/thrallsbro/fairbanks/US?api_key=API_KEY
export async function getCharacterRankings(options) {
    let result;
    try {
        result = await $.ajax({
            type: "GET",
            crossOrigin: true,
            dataType: "json",
            url: ApiUrl + '/rankings/character/' + options.character + '/fairbanks/US?zone=' + options.zone + '&api_key=' + ApiKey
        });
    } catch (error) {
        console.error(error);
    }
    return result;
}

export function getCharacterLogs(character) {

}
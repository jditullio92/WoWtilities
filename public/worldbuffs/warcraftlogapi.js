// Warcraft Logs Api (v1) 
// see: https://classic.warcraftlogs.com/v1/docs/
const ApiUrl = "https://classic.warcraftlogs.com:443/v1";
// Api key
const ApiKey = "f5419b12c6f4ad49d9ee69874a61b0c2";

// ex: https://classic.warcraftlogs.com:443/v1/zones?api_key=f5419b12c6f4ad49d9ee69874a61b0c2
export function getZones() {

}

// ex: https://classic.warcraftlogs.com:443/v1/parses/character/thrallsbro/fairbanks/US?api_key=f5419b12c6f4ad49d9ee69874a61b0c2
export async function getCharacterParses(character) {
    let result;
    try {
        result = await $.ajax({
            type: "GET",
            crossOrigin: true,
            dataType: "json",
            url: ApiUrl + '/parses/character/' + character + '/fairbanks/US?api_key=' + ApiKey
        });
    } catch (error) {
        console.error(error);
    }
    return result;
}

export function getCharacterLogs(character) {

}
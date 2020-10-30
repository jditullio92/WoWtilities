// Warcraft Logs Api (v1) URL
const apiUrl = "https://classic.warcraftlogs.com:443/v1";
// Api key associated w/ my account
const apiKey = "f5419b12c6f4ad49d9ee69874a61b0c2";

// Example: https://classic.warcraftlogs.com:443/v1/parses/character/thrallsbro/fairbanks/US?api_key=f5419b12c6f4ad49d9ee69874a61b0c2
export async function getCharacterParses(character) {
    let result;
    try {
        result = await $.ajax({
            type: "GET",
            crossOrigin: true,
            dataType: "json",
            url: apiUrl + '/parses/character/' + character + '/fairbanks/US?api_key=' + apiKey
        });
    } catch (error) {
        console.error(error);
    }
    return result;
}

export function getCharacterLogs(character) {

}
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

// Handle getting parse and rank data for a character
export async function getCharacterData(character, options) {
    let result = { parses: '', rankings: '' };
    result.parses = await getCharacterParses(character, options);
    result.rankings = await getCharacterRankings(character, options);
    return result;
}

// ex: https://classic.warcraftlogs.com:443/v1/parses/character/thrallsbro/fairbanks/US?api_key=API_KEY
export async function getCharacterParses(character, options) {
    let result;
    let queryOptions = setQueryOptions(options);
    try {
        result = await $.ajax({
            type: "GET",
            crossOrigin: true,
            dataType: "json",
            url: `${ApiUrl}/parses/character/${character}/fairbanks/US?${queryOptions}&api_key=${ApiKey}`
        });
    } catch (error) {
        console.error(error);
    }
    return result;
}

// ex: https://classic.warcraftlogs.com:443/v1/rankings/character/thrallsbro/fairbanks/US?api_key=API_KEY
export async function getCharacterRankings(character, options) {
    let result;
    let queryOptions = setQueryOptions(options);
    try {
        result = await $.ajax({
            type: "GET",
            crossOrigin: true,
            dataType: "json",
            url: `${ApiUrl}/rankings/character/${character}/fairbanks/US?${queryOptions}&api_key=${ApiKey}`
        });
    } catch (error) {
        console.error(error);
    }
    return result;
}

// Handle setting the query string from the options passed from client
function setQueryOptions(options) {
    let result = "";
    for (let opt in options) {
        if (options[opt]) {
            result += `&${opt}=${options[opt]}`;
        }
    }
    // drop the first "&" if we have a string
    if (result.length > 0) result = result.replace(/&/, '');
    return result;
}
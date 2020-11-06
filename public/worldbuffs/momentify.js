// set default values for moment.js
export function initMomentDefaults() {
    // Set defaults for moment.js
    moment.defaultFormat = "MM/DD/.YYYY h:mm:ss a";
}

// use moment to get the difference between now and a given date
export function getDuration(time) {
    return moment.duration(time.diff(new moment())).humanize();
}

// use moment to get the time until a given date
export function getTimeUntil(time) {
    return new moment().to(time);
}

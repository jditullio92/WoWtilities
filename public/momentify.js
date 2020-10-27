// DateTime manipulation using the moment.js library

// use moment to get the difference between now and a given date
// const getDuration = (time) => { return moment.duration(time.diff(new moment())).humanize(); };

export function getDuration(time) {
    return moment.duration(time.diff(new moment())).humanize();
}

// use moment to get the time until a given date
// const getTimeUntil = (time) => { return new moment().to(time); };

export function getTimeUntil(time) {
    return new moment().to(time);
}

// Initialize a new timer object
export function initTimer(obj) {
    return {
        interval: '',
        time: '',
        timer: {
            clear: () => { clearInterval(NefInterval); },
            start: () => { NefInterval = setInterval(function () { $('#timerNef').val(dateroutines.getDuration(Nefarian.time)); }, 1000); },
        }
    };
}

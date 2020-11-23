// Nefarian
export function initNefarian() {
    return {
        time: '',
        interval: '',
        timer: {
            clear: () => { clearInterval(Nefarian.interval); },
            start: () => {
                Nefarian.interval = setInterval(function () {
                    $('#timerNef').val(dateroutines.getDuration(Nefarian.time));
                }, 1000);
            },
        }
    };
}

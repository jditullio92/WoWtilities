// Rend
export function initRend() {
    return {
        time: '',
        interval: '',
        timer: {
            clear: () => { clearInterval(Rend.interval); },
            start: () => {
                Rend.interval = setInterval(function () {
                    $('#timeUntilRend').val(dateroutines.getDuration(Rend.time));
                }, 1000);
            },
        }
    };
}

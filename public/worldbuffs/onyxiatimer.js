// Rend
export function initOnyxia() {
    return {
        time: '',
        interval: '',
        timer: {
            clear: () => { clearInterval(Onyxia.interval); },
            start: () => {
                Onyxia.interval = setInterval(function () {
                    $('#timeUntilOny').val(dateroutines.getDuration(Onyxia.time));
                }, 1000);
            },
        }
    };
}

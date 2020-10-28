// Rend
let Rend = {
    time: '',
    timer: {
        clear: () => { clearInterval(RendInterval); },
        start: () => {
            RendInterval = setInterval(function () {
                $('#timeUntilRend').val(dateroutines.getDuration(Rend.time));
            }, 1000);
        },
    }
}
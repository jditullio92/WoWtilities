// Rend
export function initRend() {
    return {
        element: document.getElementById("timeUntilRend"),
        interval: '',
        time: '',
        timer: {
            clear: () => { clearInterval(Rend.interval); },
            start: () => {
                Rend.interval = setInterval(function () {
                    let duration = moment.duration(Rend.time.diff(new moment())).humanize();
                    Rend.element.value = duration;
                }, 1000);
            },
        }
    };
}

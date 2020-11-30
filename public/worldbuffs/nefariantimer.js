// Nefarian
export function initNefarian() {
    return {
        element: document.getElementById("timeUntilNef"),
        time: '',
        interval: '',
        timer: {
            clear: () => { clearInterval(Nefarian.interval); },
            start: () => {
                Nefarian.interval = setInterval(function () {
                    let duration = moment.duration(Nefarian.time.diff(new moment())).humanize();
                    Nefarian.element.value = duration;
                }, 1000);
            },
        }
    };
}

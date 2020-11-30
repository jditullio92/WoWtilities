// Onyxia
export function initOnyxia() {
    return {
        element: document.getElementById("timeUntilOny"),
        time: '',
        interval: '',
        timer: {
            clear: () => { clearInterval(Onyxia.interval); },
            start: () => {
                Onyxia.interval = setInterval(function () {
                    let duration = moment.duration(Onyxia.time.diff(new moment())).humanize();
                    Onyxia.element.value = duration;
                }, 1000);
            },
        }
    };
}

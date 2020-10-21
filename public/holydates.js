//#region Date Routines

//Converts date string or object to formatted date  & time string (MM/DD/YYYY HH:MM) (24 hour time w/o seconds)
function getFormattedDateTimeHHMM(dateObj) {
    var d = new Date(dateObj);
    return getFormattedDate(d) + ' ' + getFormattedTimeHHMM(d);
}

//Converts date string or object to formatted date  & time string (MM/DD/YYYY HH:MM:SS) (24 hour time w/seconds)
function getFormattedDateTimeHHMMSS(dateObj) {
    var d = new Date(dateObj);
    return getFormattedDate(d) + ' ' + getFormattedTimeHHMMSS(d);
}

//Converts date string or object to formatted date  & time string (MM/DD/YYYY hh:mm TT) (AM/PM w/o seconds)
function getFormattedDateTimeAmPm(dateObj) {
    var d = new Date(dateObj);
    return getFormattedDate(d) + ' ' + getFormattedTimeAmPm(d);
}

//Converts date string or object to formatted date  & time string (MM/DD/YYYY hh:mm TT DOW) (AM/PM w/o seconds)
function getFormattedDateTimeAmPmAbbrDow(dateObj) {
    var d = new Date(dateObj);
    return getFormattedDate(d) + ' ' + getFormattedTimeAmPm(d) + ' ' + getAbbrDowName(d);
}

//Converts date string or object to formatted date  & time string (MM/DD/YYYY hh:mm:ss TT DOW) (AM/PM w seconds)
function getFormattedDateTimeSSAmPmAbbrDow(dateObj) {
    var d = new Date(dateObj);
    return getFormattedDate(d) + ' ' + getFormattedTimeSSAmPm(d) + ' ' + getAbbrDowName(d);
}

//Converts date string or object to formatted date  & time string (MM/DD/YYYY hh:mm:ss TT) (AM/PM w seconds)
function getFormattedDateTimeSSAmPm(dateObj) {
    var d = new Date(dateObj);
    return getFormattedDate(d) + ' ' + getFormattedTimeSSAmPm(d);
}

//Converts date string or object to formatted date string (MM/DD/YYYY)
function getFormattedDate(dateObj) {
    var d = new Date(dateObj);
    return ((d.getMonth() + 1 < 10) ? '0' : '') + (d.getMonth() + 1) + '/' + ((d.getDate() < 10) ? '0' : '') + (d.getDate()) + '/' + (d.getFullYear() + (d.getFullYear() < 2000 ? 100 : 0));
}

//Converts date string or object to formatted date string (MM/DD/YYYY DOW)
function getFormattedDateAbbrDow(dateObj) {
    var d = new Date(dateObj);
    return ((d.getMonth() + 1 < 10) ? '0' : '') + (d.getMonth() + 1) + '/' + ((d.getDate() < 10) ? '0' : '') + (d.getDate()) + '/' + (d.getFullYear() + (d.getFullYear() < 2000 ? 100 : 0)) + ' ' + getAbbrDowName(d);
}

//Converts date & time string or object to formatted time string (HH:MM) (24 hour time w/o seconds)
function getFormattedTimeHHMM(dateObj) {
    var d = new Date(dateObj);
    return ((d.getHours() < 10) ? '0' : '') + (d.getHours()) + ':' + //Hours
        ((d.getMinutes() < 10) ? '0' : '') + (d.getMinutes()); //Minutes
}

//Converts date & time string or object to formatted time string (HH:MM:SS) (24 hour time w/seconds)
function getFormattedTimeHHMMSS(dateObj) {
    var d = new Date(dateObj);
    return ((d.getHours() < 10) ? '0' : '') + (d.getHours()) + ':' + //Hours
        ((d.getMinutes() < 10) ? '0' : '') + (d.getMinutes()) + ':' + //Minutes
        ((d.getSeconds() < 10) ? '0' : '') + (d.getSeconds()); //Seconds
}

//Converts date & time string or object to formatted time string (hh:mm TT) (AM/PM w/o seconds)
function getFormattedTimeAmPm(dateObj) {
    var d = new Date(dateObj);
    var h = (d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
    var t = (d.getHours() > 11 ? 'PM' : 'AM');
    if (h === 0) {
        h = 12;
    }
    return ((h < 10 ? '0' : '') + (h)) + ':' + //Hours (12)
        ((d.getMinutes() < 10) ? '0' : '') + (d.getMinutes()) + ' ' + //Minutes
        t; //AM/PM
}

//Converts date & time string or object to formatted time string (hh:mm:ss TT) (AM/PM w seconds)
function getFormattedTimeSSAmPm(dateObj) {
    var d = new Date(dateObj);
    var h = (d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
    var t = (d.getHours() > 11 ? 'PM' : 'AM');
    if (h === 0) {
        h = 12;
    }
    return ((h < 10 ? '0' : '') + (h)) + ':' + //Hours (12)
        ((d.getMinutes() < 10) ? '0' : '') + (d.getMinutes()) + ':' + //Minutes
        ((d.getSeconds() < 10) ? '0' : '') + (d.getSeconds()) + ' ' + //Seconds
        t; //AM/PM
}

//Converts date & time string or object to formatted date/time string (ddd MMM dd, YYYY)
function getFormattedDateTimedddMMMddYYYY(dateObj) {
    var d = new Date(dateObj);
    return d.toDateString().replaceNth(' ', ', ', 3);
}

//Converts date & time string or object to formatted date/time string (ddd MMM dd, YYYY hh:mm TT)
function getFormattedDateTimedddMMMddYYYYhhmmTT(dateObj) {
    var d = new Date(dateObj);
    return d.toDateString().replaceNth(' ', ', ', 3) + ' ' + getFormattedTimeAmPm(d);
}

//Converts date & time string or object to formatted date/time string (ddd MMM dd, YYYY hh:mm:ss TT)
function getFormattedDateTimedddMMMddYYYYhhmmssTT(dateObj) {
    var d = new Date(dateObj);
    return d.toDateString().replaceNth(' ', ', ', 3) + ' ' + getFormattedTimeSSAmPm(d);
}

//Converts date & time string or object to formatted time string (MMM dd @ hh:mm TT)
function getFormattedDateTimeMMddhhmmtt(dateObj) {
    var d = new Date(dateObj);
    return getAbbrMonthName(d) + ' ' + (d.getDate() < 10 ? '0' : '') + d.getDate() + ' @ ' + getFormattedTimeAmPm(d);
}

//Converts date & time string or object to formatted time string (hh:mm TT ddd MMM dd, yyyy)
function getFormattedDateTimehhmmttdddMMMddyyyy(dateObj) {
    var d = new Date(dateObj);
    return getFormattedTimeAmPm(d) + ' ' + getAbbrDowName(d) + ' ' + getAbbrMonthName(d) + ' ' + (d.getDate() < 10 ? '0' : '') + d.getDate() + ', ' + d.getFullYear();
}

//Converts date & time string or object to formatted time string (MMM dd)
function getFormattedDateTimeMMMdd(dateObj) {
    var d = new Date(dateObj);
    return getAbbrMonthName(d) + ' ' + (d.getDate() < 10 ? '0' : '') + d.getDate();
}

//Converts date & time string or object to formatted time string (MMM dd, YYYY)
function getFormattedDateTimeMMMddYYYY(dateObj) {
    var d = new Date(dateObj);
    return getAbbrMonthName(d) + ' ' + (d.getDate() < 10 ? '0' : '') + d.getDate() + ', ' + (d.getYear() + 1900);
}

//Get abbreviated month name from date object or string
function getAbbrMonthName(dateObj) {
    var d = new Date(dateObj);
    var month = [];
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return month[d.getMonth()];
}

//Get full month name from date object or string
function getFullMonthName(dateObj) {
    var d = new Date(dateObj);
    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[d.getMonth()];
}

//Get abbreviated day of week name from date object or string
function getAbbrDowName(dateObj) {
    var d = new Date(dateObj);
    var weekday = [];
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    return weekday[d.getDay()];
}

//Get full day of week name from date object or string
function getFullDowName(dateObj) {
    var d = new Date(dateObj);
    var weekday = [];
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[d.getDay()];
}

//Convert 24 time string to AM/PM (ex: 13:30 to 1:30P)
function convertTimeString(t) {
    var h = parseInt(t.substr(0, 2), 10);
    var m = parseInt(t.substr(3, 2), 10);
    var ampm = 'AM';
    if (h >= 12) {
        ampm = 'PM';
    }
    if (h > 12) {
        h = h - 12;
    }
    return (h + ':' + (m < 10 ? '0' : '') + m + ampm);
}

//Expand time, requires: [<:minute>][m]
function expandTime(time) {
    time = time.toLowerCase().replace(/ /g, '');
    var hr = '';
    var mn = '';
    var xm = '';
    var part = 'hours';
    //Break out parts (0=hour, 1=mins)
    for (var i = 0; i < time.length; i++) {
        var c = time.substr(i, 1);
        //We have a separator (':' or 'a/p')?
        if (c === ':') {
            //Switch to minutes
            part = 'minutes';
        } else if (c === 'a' || c === 'p') {
            //Save Ap/PM
            xm = (c === 'a' ? 'AM' : 'PM');
            break;
        }
        //Save based on which part we are parsing (skip colon)
        if (c !== ':') {
            switch (part) {
                case 'hours':
                    hr += c;
                    break;
                case 'minutes':
                    mn += c;
                    break;
            }
        }
    }
    //Handle hours & mins run together, no ':', ex: 730, 1230)
    if (hr.length === 3) {
        mn = hr.substr(1, 2);
        hr = hr.substr(0, 1);
    } else if (hr.length === 4) {
        mn = hr.substr(2, 2);
        hr = hr.substr(0, 2);
    }
    //Handle adding AM/PM if not there (7-11 is AM and 12-6 is PM)
    if (hr.length > 0 && xm.length === 0) {
        var h = parseInt(hr, 10);
        if (h >= 7 && h < 12) {
            xm = 'AM';
        } else if (h === 12 || (h >= 1 && h < 7)) {
            xm = 'PM';
        }
    }
    //Return formatted time
    return hr.lpad('0', 2) + ':' + mn.lpad('0', 2) + ' ' + xm;
}

//Function to get # of calendar days difference between two dates
function dayDiff(date1, date2) {
    //Store the getTime diff - or +
    var daydiff = date2.getTime() - date1.getTime();
    //Convert values to -/+ days and return value
    return (daydiff / (24 * 60 * 60 * 1000));
}

//Get next date for given day number (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thr, 5=Fri, 6=Sat)
function getNextDayByDowNumber(date, dow) {
    //Start with tomorrow
    date = new Date(date);
    var target = date.addDays(1);

    //Step forward till we find it
    for (var i = 0; i < 7; i++) {
        if (target.getDay() === dow) {
            break;
        }
        target = target.addDays(1);
    }
    return target;
}

//#endregion
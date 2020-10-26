// import moment from 'moment';
var moment = require('moment');

function getNow() { return moment().format(); }

function convertToMomentDate(date) { return moment(date).format(); }
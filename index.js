// Your code here
function createEmployeeRecord(array) {
    const newRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3], 
        timeInEvents: [],
        timeOutEvents: []
    };
    return newRecord;
};

function createEmployeeRecords(array) {
    const newArray = [];
    array.map(arr => newArray.push(createEmployeeRecord(arr)));
    return newArray;
};

function createTimeInEvent(record, datestamp) {
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(datestamp.split(" ")[1]),
        date: datestamp.split(" ")[0]
    });
    return record;
};

function createTimeOutEvent(record, datestamp) {
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(datestamp.split(" ")[1]),
        date: datestamp.split(" ")[0]
    });
    return record;
};

function hoursWorkedOnDate(record, date) {
    const inDate = record.timeInEvents.find(timeIn => timeIn.date === date);
    const outDate = record.timeOutEvents.find(timeOut => timeOut.date === date);
    return (outDate.hour - inDate.hour) * .01;
};

function wagesEarnedOnDate(record, date) {
    return ((hoursWorkedOnDate(record, date)) * record.payPerHour);
};

function allWagesFor(record) {
    const datesWorked = [];
    datesWorked.push(record.timeInEvents.map(date => date.date));
    const wages = datesWorked[0].map(date => wagesEarnedOnDate(record, date));
    return wages.reduce((memo, el) => memo + el);
};

function calculatePayroll(employeesArr) {
    return employeesArr.map(emp => allWagesFor(emp)).reduce((memo, el) => memo + el);
};

function findEmployeeByFirstName(employeesArr, name) {
    return employeesArr.find(emp => emp.firstName === name);
};
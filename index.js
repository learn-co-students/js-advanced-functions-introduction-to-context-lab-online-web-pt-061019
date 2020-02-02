// Your code here

function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],  
        familyName:employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeObj, timeInStamp) {
    let [date, time] = timeInStamp.split(' ')
    employeeObj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })
    return employeeObj
}

function createTimeOutEvent(employeeObj, timeOutStamp) {
    let [date, time] = timeOutStamp.split(' ')
    employeeObj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, date) {
    let timeIn = employeeObj.timeInEvents.find(el => el.date === date)
    let timeOut = employeeObj.timeOutEvents.find(el => el.date === date)
    let hoursWorkedTotal = (timeOut.hour - timeIn.hour) / 100
    return hoursWorkedTotal 
}

function wagesEarnedOnDate(employeeObj, date) {
    return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour
}

function allWagesFor(employeeObj) {
    let datesWorked = employeeObj.timeInEvents.map(el => el.date)
    let wagePerDate = datesWorked.map(date => wagesEarnedOnDate(employeeObj, date))
    return wagePerDate.reduce((total, wage) => total + wage, 0)
}

function calculatePayroll(employeeArrays) {
    let payroll = employeeArrays.reduce((total, employee) => total + allWagesFor(employee), 0)
    return payroll
}

function findEmployeeByFirstName(employeeArrays, firstName) {
    return employeeArrays.find( employee => employee.firstName === firstName )
}
function createEmployeeRecord(employee) {
    // return JavaScript Object with keys:
    return {
        firstName: employee[0],  
        familyName:employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeObj, timeInStamp) {
    // console.log(timeInStamp)
    // console.log(typeof timeInStamp)
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
    // console.log(employeeObj)
    // console.log(date)
    let timeIn = employeeObj.timeInEvents.find(el => el.date === date)
    let timeOut = employeeObj.timeOutEvents.find(el => el.date === date)
    let hoursWorkedTotal = (timeOut.hour - timeIn.hour) / 100
    // console.log(hoursWorkedTotal)
    return hoursWorkedTotal 
}

function wagesEarnedOnDate(employeeObj, date) {
    // let totalHours = hoursWorkedOnDate(employeeObj,date)
    // let payOwed = totalHours * employeeObj.payPerHour
    // return payOwed
    return hoursWorkedOnDate(employeeObj, date) * employeeObj.payPerHour
}

function allWagesFor(employeeObj) {
    // console.log(employeeObj)
    // let payOwedAllDates = employeeObj.timeInEvents.reduce((total, day) => total + wagesEarnedOnDate(employeeObj, day.date), 0)
    // return payOwedAllDates
    
    // console.log(employeeObj.timeInEvents)
    let datesWorked = employeeObj.timeInEvents.map(el => el.date)
    // console.log(datesWorked)
    let wagePerDate = datesWorked.map(date => wagesEarnedOnDate(employeeObj, date))
    // console.log(wagePerDate)
    return wagePerDate.reduce((total, wage) => total + wage, 0)
}

function calculatePayroll(employeeArrays) {
    // console.log(employeeArrays)
    let payroll = employeeArrays.reduce((total, employee) => total + allWagesFor(employee), 0)
    return payroll
}

function findEmployeeByFirstName(employeeArrays, firstName) {
    return employeeArrays.find( employee => employee.firstName === firstName )
}


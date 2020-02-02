// Your code here

function createEmployeeRecord(employee) {
    // returns JavaScript Object with keys:
    return {
        firstName: employee[0],  
        familyName:employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArray){
  return employeeArray.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, timeStamp){
  let [date, time] = timeStamp.split(' ')
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time, 10),
    date: date
  })
  return employee;
}

function createTimeOutEvent(employee, timeStamp){
  let [date, time] = timeStamp.split(' ')
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(time, 10),
    date: date
  })
  return employee;
}

function hoursWorkedOnDate(employee, date){
  let timeIn = employee.timeInEvents.find(el => el.date === date)
  let timeOut = employee.timeOutEvents.find(el => el.date === date)
  let hoursWorked = (timeOut.hour - timeIn.hour) / 100
 
  return hoursWorked; 
}

function wagesEarnedOnDate(employee, date){
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee){
  let dates = employee.timeInEvents.map(em => em.date)
  let wageOnDate = dates.map(date => wagesEarnedOnDate(employee, date))
  return wageOnDate.reduce((sum, date) => sum + date, 0)
}

function calculatePayroll(employeeArrs){
  let payroll = employeeArrs.reduce((sum, employee) => sum + allWagesFor(employee), 0)
  return payroll;
}

function findEmployeeByFirstName(employeeArrs, firstName){
  return employeeArrs.find(employee => employee.firstName === firstName)
}
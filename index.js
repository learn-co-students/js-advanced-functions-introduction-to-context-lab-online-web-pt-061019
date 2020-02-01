// Your code here

const createEmployeeRecord = (employee) => {
  return {
    firstName: employee[0], 
    familyName: employee[1], 
    title: employee[2], 
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (employees) => {
  return employees.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = (employeeRecord, dateStamp) => {
  const [date, time]= dateStamp.split(' ')

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time),
    date: date
  })
  return employeeRecord
}

const createTimeOutEvent = (employeeRecord, dateStamp) => {
  const [date, time]= dateStamp.split(' ')

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(time),
    date: date
  })
  return employeeRecord
}

const hoursWorkedOnDate = (employeeRecord, formDate) => {
  const timeIn = employeeRecord.timeInEvents.find(workday => workday.date === formDate)
  const timeOut = employeeRecord.timeOutEvents.find(workday => workday.date === formDate)

  return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = (employeeRecord, formDate) => {
  return (hoursWorkedOnDate(employeeRecord, formDate)) * employeeRecord.payPerHour
}

const allWagesFor = (employeeRecord) => {
  const workDays = employeeRecord.timeInEvents.map(workDay => workDay.date)

  return workDays.reduce((accumulator, date) => {
    return accumulator + wagesEarnedOnDate(employeeRecord, date)
  }, 0)
}

function calculatePayroll(employeeRecordsArr) {
  const employeesWages = employeeRecordsArr.map(employee => allWagesFor(employee))
  return employeesWages.reduce((wage, total) => wage + total)
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName)
}

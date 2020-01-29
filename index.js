function createEmployeeRecord(array){
  let employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord
}

function createEmployeeRecords(arrayOfArrays){
  return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp){
  let date = dateStamp.split(' ')[0]
  let time = parseInt(dateStamp.split(' ')[1])

  employeeRecord.timeInEvents.push({type: 'TimeIn', hour: time, date: date})
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
  let date = dateStamp.split(' ')[0]
  let time = parseInt(dateStamp.split(' ')[1])

  employeeRecord.timeOutEvents.push({type: 'TimeOut', hour: time, date: date})
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
  let timeIn = employeeRecord.timeInEvents.find(dayWorked => dayWorked.date === date)
  let timeOut = employeeRecord.timeOutEvents.find(dayWorked => dayWorked.date === date)
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, date){
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
  let daysWorked = employeeRecord.timeInEvents.map(time => {
    return time.date
  })

  return daysWorked.reduce(function(memo, date){
    return memo + wagesEarnedOnDate(employeeRecord, date)
  }, 0)
}

function calculatePayroll(arrayOfEmployeeRecords){
  let sum = arrayOfEmployeeRecords.map(e => allWagesFor(e))
  return sum.reduce((num, sum) => num + sum)
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(name => {return name.firstName === firstName})
}

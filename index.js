function createEmployeeRecord(recordArray){
  return {
    firstName: recordArray[0],
    familyName: recordArray[1], 
    title: recordArray[2], 
    payPerHour: recordArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
};

function createEmployeeRecords(employeeRecords){
  return employeeRecords.map(function(record){
    return createEmployeeRecord(record)
  })
};

function createTimeInEvent(record, dateStamp){
  record.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(dateStamp.split(" ")[1]),
      date: dateStamp.split(" ")[0]
  })
  return record
};

function createTimeOutEvent(record, dateStamp){
  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0]
  })
  return record
};

function hoursWorkedOnDate(record, date){
  const outDate = record.timeOutEvents.find(timeOut => timeOut.date === date)
  const inDate = record.timeInEvents.find(timeIn => timeIn.date === date)
  return (outDate.hour - inDate.hour) / 100
};

function wagesEarnedOnDate(record, date){
  return ((hoursWorkedOnDate(record, date)) * record.payPerHour)
};

function allWagesFor(record){
  const datesWorked = [] 
  datesWorked.push(record.timeInEvents.map(date => date.date))
  const wages = datesWorked[0].map(date => wagesEarnedOnDate(record, date))
  return wages.reduce((memo, element) => memo + element)
};

function calculatePayroll(employeesArray) {
  return employeesArray.map(employee => allWagesFor(employee)).reduce((memo, element) => memo + element)
};

function findEmployeeByFirstName(employeesArray, name) {
  return employeesArray.find(employee => employee.firstName === name)
}; 
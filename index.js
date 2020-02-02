// Your code here
function createEmployeeRecord(ee) {
    return {
        firstName: ee[0],
        familyName: ee[1],
        title: ee[2],
        payPerHour: ee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(eeArr) {
    return eeArr.map(ee => createEmployeeRecord(ee))
}

function createTimeInEvent(eeRecord, timeInStamp) {
    const [date, time]= timeInStamp.split(' ')
    
    eeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    })
    return eeRecord
}

function createTimeOutEvent(eeRecord, timeOutStamp) {
    const [date, time]= timeOutStamp.split(' ')
    
    eeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    })
    return eeRecord
}

function hoursWorkedOnDate(eeRecord, date){
    let timeIn = eeRecord.timeInEvents.find(dayWorked => dayWorked.date === date)
    let timeOut = eeRecord.timeOutEvents.find(dayWorked => dayWorked.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(eeRecord, date){
    return hoursWorkedOnDate(eeRecord, date) * eeRecord.payPerHour
}

function allWagesFor(eeRecord){
    let daysWorked = eeRecord.timeInEvents.map(time => {
        return time.date
})

return daysWorked.reduce(function(memo, date){
    return memo + wagesEarnedOnDate(eeRecord, date)
  }, 0)
}

function calculatePayroll(arrayOfEeRecords){
  let sum = arrayOfEeRecords.map(e => allWagesFor(e))
  return sum.reduce((num, sum) => num + sum)
}

function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(name => {return name.firstName === firstName})
}
// Your code here
function createEmployeeRecord(recordArray){
    return {
        firstName: recordArray[0],
        familyName: recordArray[1], 
        title: recordArray[2], 
        payPerHour: recordArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRecords){
    return employeeRecords.map(function(record){
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(employeeRecord, dateStamp){
   let [date, hour] = dateStamp.split(' ')
       employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employeeRecord
};

function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ')
        employeeRecord.timeOutEvents.push({
         type: "TimeOut",
         hour: parseInt(hour),
         date: date
     })
     return employeeRecord
 };

 function hoursWorkedOnDate(employeeRecord, date){
    // console.log(employeeRecord)
     let inEvent = employeeRecord.timeInEvents.find(function(timeRecord){
        return timeRecord.date === date
     })

     let outEvent = employeeRecord.timeOutEvents.find(function(timeRecord){
        return timeRecord.date === date
     })
    return (outEvent.hour-inEvent.hour)/100
 };

 function wagesEarnedOnDate(employeeRecord, date){
    let wage = employeeRecord.payPerHour
    let pay = hoursWorkedOnDate(employeeRecord, date) * wage
    return pay
 }

 function allWagesFor(employee){
     let dates = employee.timeInEvents.map(function(event){
         return event.date
     })
     let payable = dates.reduce(function(wages, date){
        return wages + wagesEarnedOnDate(employee, date)
    }, 0)
    return payable
}

function findEmployeeByFirstName(employeeRecords, firstName){
    let employee = employeeRecords.find(function(record){
        return record.firstName === firstName
    })
    return employee
}

function calculatePayroll(employeeRecords){
   return employeeRecords.reduce(function(memo, employee){
       return memo + allWagesFor(employee)
   } ,0)
}
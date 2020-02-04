import { interfaces } from "mocha";

// Your code here
function createEmployeeRecord(arr){
  return {firstName: arr[0],
          familyName:  arr[1],
          title: arr[2],
          payPerHour: arr[3],
          timeInEvents: [],
          timeOutEvents: []
  }
}

function createEmployeeRecords(arr){
  let employeeRecords =[];
      
  for (let i=0; i < arr.length; i++){
     employeeRecords.push(createEmployeeRecord(arr[i]))
  }
  return employeeRecords;
}

// function createTimeInEvent(bpRecord,dateStamp){
function createTimeInEvent(bpRecord,dateStamp){
  let obj = {
    type: "TimeIn",
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  }
  bpRecord.timeInEvents.push(obj)
  return bpRecord
}

function createTimeOutEvent(bpRecord, dateStamp) {
  let obj = {
    type: "TimeOut",
    hour: parseInt(dateStamp.split(' ')[1]),
    date: dateStamp.split(' ')[0]
  }
  bpRecord.timeOutEvents.push(obj)
  return bpRecord
}

// function hoursWorkedOnDate(obj, dateStamp) {
//   // console.log(obj)
//   // console.log(dateStamp)
//   let inHr = (obj.timeInEvents[0].hour)/100
//   let outHr = (obj.timeOutEvents[0].hour)/100
//   return outHr - inHr
// }

function hoursWorkedOnDate(employee, soughtDate){
  let inEvent = employee.timeInEvents.find(function(e){
      return e.date === soughtDate
  })

  let outEvent = employee.timeOutEvents.find(function(e){
      return e.date === soughtDate
  })

  return (outEvent.hour - inEvent.hour) / 100
}


// function wagesEarnedOnDate(obj, dateStamp) {
//   return hoursWorkedOnDate(obj, dateStamp) * obj.payPerHour
// }


function wagesEarnedOnDate(employee, dateSought){
  let rawWage = hoursWorkedOnDate(employee, dateSought)
      * employee.payPerHour
  return parseFloat(rawWage.toString())
}

function allWagesFor(employee){
  let eligibleDates = employee.timeInEvents.map(function(e){
      return e.date
  })

  let payable = eligibleDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return payable
}

// function allWagesFor() {
//   let dates = this.timeInEvents.map(function(e){
//     return e.date
//   })
//   // console.log(dates)
//   let pay = dates.reduce(function(incrementor,date){
//       return incrementor + wagesEarnedOnDate(this,date)
//     }.bind(this), 0)
//    return pay
// }


function findEmployeeByFirstName(srcArray,firstName) {
  
  for (let i=0; i < srcArray.length; i++){
    // console.log(srcArray[i])
   if (srcArray[i].firstName == firstName){
    // console.log(srcArray[i].firstName)
    return srcArray[i]
   }
  }
}

function calculatePayroll(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce(function(memo, rec){
      return memo + allWagesFor(rec)
  }, 0)
}
// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr) {
  // let records = arr.map(function(el) {
  //   createEmployeeRecord(el)
  // });
  // return records;
  let records = arr.map(createEmployeeRecord);
  return records;
}

function hoursFromStamp(dateStamp) {
  let arr = dateStamp.split(" ");
  let time = parseFloat(arr[1], 10);
  return time;
};

function dateFromStamp(dateStamp) {
  let arr = dateStamp.split(" ");
  let date = arr[0];
  // let dateSplit = date.split("-");
  // let day = dateSplit[2]
  return date;
};

function createTimeInEvent(obj, dateStamp) {
  obj.timeInEvents.push(
    {
    type: "TimeIn",
    hour: hoursFromStamp(dateStamp),
    date: dateFromStamp(dateStamp)
  }
  )
  return obj
}

function createTimeOutEvent(obj, dateStamp) {
  obj.timeOutEvents.push({
    type: "TimeOut",
    hour: hoursFromStamp(dateStamp),
    date: dateFromStamp(dateStamp)
  })
  return obj
}

// function findByDate(obj, date) {
//   let theDate = obj.timeInEvents.find(function(e) {
//     e.date === date
//   });
//   return theDate;
//   // return obj.timeInEvents[i]
// }

function hoursWorkedOnDate(obj, date) {
  let theTimeInEvent = obj.timeInEvents.find(function(e) {
    return e.date === date;
  });
  let hourStarted = theTimeInEvent.hour / 100;
  let theTimeOutEvent = obj.timeOutEvents.find(function(e) {
    return e.date === date;
  });
  let hourFinished = theTimeOutEvent.hour / 100;
  let hoursWorked = hourFinished - hourStarted;
  return hoursWorked;

}

function wagesEarnedOnDate(obj, date) {
  let wage = obj.payPerHour;
  let hours = hoursWorkedOnDate(obj, date);
  let payOwed = hours * wage;
  return payOwed;
}



function allWagesFor(obj) {
  const allDays = obj.timeInEvents.map(function(e) {
    return e.date;
  })
  // console.log(allDays);
  const allWages = allDays.map(function(day) {
    return wagesEarnedOnDate(obj, day)
  })
  // console.log(allWages);
  const totalMoney = allWages.reduce(function(memo, i) { return memo + i })
  return totalMoney;
}

function findEmployeeByFirstName(srcArray, firstName) {
  const match = srcArray.find(function(e) {
    return e.firstName = firstName;
  });
  return match;
}

function calculatePayroll(arr) {
  const allWages = arr.map(allWagesFor);
  const total = allWages.reduce(function(memo, i) { return memo + i });
  return total;
}

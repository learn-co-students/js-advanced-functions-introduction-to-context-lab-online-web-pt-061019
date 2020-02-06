// Your code here

document.addEventListener('DOMContentLoaded', (event) => {
  console.log("🍕")
    hoursWorkedOnDate();
});


// ["Shannon","Crabill","Boss",100,[],[]]

// let sc = {
//   firstName: "Shannon",
//   familyName: "Crabill",
//   title: "Boss",
//   payPerHour: 100,
//   timeInEvents: [
//     {
//       type: "TimeIn",
//       hour: "0900",
//       date: "2020-02-05"
//     }
//   ],
//   timeOutEvents: [
//     {
//       type: "TimeOut",
//       hour: "1800",
//       date: "2020-02-05"
//     }
//   ]
// }

function createEmployeeRecord(array) {
  let employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }

  return employee
}

function createEmployeeRecords(arrays) {
  let newArray = []

  // arrays.map(function callback( currentValue[, index[, array]]) {
  //     // return element for new_array
  //     newArray.push(createEmployeeRecord(currentValue));
  // })

  arrays.forEach((array, i) => {
    let employee = createEmployeeRecord(array);
    newArray.push(employee);
  });


  return newArray


}

function createTimeInEvent(employeeObject, dateStamp) {
  // A date stamp ("YYYY-MM-DD HHMM")
  let time = dateStamp.split(" ")
  let hour = parseInt(time[1].slice(0,5))
  let date = time[0] // How should this be formatted?

  let newObject = {
    type: "TimeIn",
    hour: hour,
    date: date
  }

  employeeObject.timeInEvents.push(newObject)

  // employeeObject[timeInEvents]["type"] = "TimeIn"
  // employeeObject["hour"] = hour
  // employeeObject["date"] = date

  return employeeObject

//   type: Set to "TimeIn"
// hour: Derived from the argument
// date: Derived from the argument

// shannon["newKey"] = "newValue"

}

function createTimeOutEvent(employeeObject, dateStamp) {
  // A date stamp ("YYYY-MM-DD HHMM")
  let time = dateStamp.split(" ")
  let hour = parseInt(time[1].slice(0,5))
  let date = time[0] // How should this be formatted?

  let newObject = {
    type: "TimeOut",
    hour: hour,
    date: date
  }

  employeeObject.timeOutEvents.push(newObject)

  // employeeObject[timeInEvents]["type"] = "TimeIn"
  // employeeObject["hour"] = hour
  // employeeObject["date"] = date

  return employeeObject

  //   type: Set to "TimeIn"
  // hour: Derived from the argument
  // date: Derived from the argument

  // shannon["newKey"] = "newValue"
}

function hoursWorkedOnDate(employeeObject, date) {

  // Given a date, find the number of hours elapsed
  // between that date's timeInEvent and timeOutEvent

//   let even = arr.filter(n => {
//   return n % 2 === 0;
// });

  // let timeOut = employeeObject.timeOutEvents.find(function(item) {return item == date})
  // let timeIn = employeeObject.timeInEvents.find(function(item) {return item == date})

  // This works!
    // let result = sc.timeInEvents.filter(item => {
    //   return item.date == "2020-02-05"
    // })

  let timeIn = employeeObject.timeInEvents.filter(item => {
    return item.date === date
  })

  let timeOut = employeeObject.timeInEvents.filter(item => {
    return item.date === date
  })

  console.log(timeOut[0].hour - timeIn[0].hour)
}

function calculatePayroll() {

}

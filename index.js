function createEmployeeRecord(record) {
  let clockIn = [];
  let clockOut = [];
  let details = {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: clockIn,
    timeOutEvents: clockOut,
  };
  return details;
}

function createEmployeeRecords(records) {
  let arr = records.map(createEmployeeRecord);
  return arr;
}

let createTimeInEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return this;
};

let createTimeOutEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return this;
};

let hoursWorkedOnDate = function (date) {
  let hours = 0;
  let clockIn = this.timeInEvents.map(function (key) {
    return key.date;
  });
  let clockOut = this.timeOutEvents.map(function (key) {
    return key.date;
  });
  hours = (clockOut.hour - clockIn.hour) / 100;
  return hours;
};

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

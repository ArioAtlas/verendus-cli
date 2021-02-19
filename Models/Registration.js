"use strict";

class Registration {
  constructor(
    firstRegistration,
    latestRegistration,
    monthlyRegistration,
    dateOfDeregistration
  ) {
    this.firstRegistration = firstRegistration;
    this.latestRegistration = latestRegistration;
    this.monthlyRegistration = monthlyRegistration;
    this.dateOfDeregistration = dateOfDeregistration;
  }

  findDiff(registration) {
    if (registration == null || !(registration instanceof Registration))
      throw "findDiff() given input is not an instance of Registration";

    let keys = new Set([...Object.keys(this), ...Object.keys(registration)]);
    let diff = [];

    keys.forEach((element) => {
      if (registration[element] !== this[element]) {
        diff.push(element);
      }
    });

    return diff;
  }

  equal(registration) {
    return (
      this.firstRegistration === registration.firstRegistration &&
      this.latestRegistration === registration.latestRegistration &&
      this.monthlyRegistration === registration.monthlyRegistration &&
      this.dateOfDeregistration === registration.dateOfDeregistration
    );
  }
}

module.exports = Registration;

"use strict";

const Registration = require("./Registration");
const Inspection = require("./Inspection");

class Vehicle {
  constructor(
    identity,
    chassisNumber,
    modelYear,
    typeApprovalNo,
    privatelyImported,
    color
  ) {
    this.identity = identity;
    this.chassisNumber = chassisNumber;
    this.modelYear = modelYear;
    this.typeApprovalNo = typeApprovalNo;
    this.privatelyImported = privatelyImported;
    this.color = color;
  }

  get registration() {
    return this._registration;
  }

  get inspection() {
    return this._inspection;
  }

  set registration(registration) {
    if (registration instanceof Registration) this._registration = registration;
    else throw "registration only accept values of the Registration type";
  }

  set inspection(inspection) {
    if (inspection instanceof Inspection) this._inspection = inspection;
    else throw "registration only accept values of the Inspection type";
  }

  findDiff(vehicle) {
    if (vehicle == null || !(vehicle instanceof Vehicle))
      throw "findDiff() given input is not an instance of Vehicle";

    let keys = new Set([...Object.keys(this), ...Object.keys(vehicle)]);
    let diff = [];

    keys.forEach((element) => {
      if (typeof vehicle[element] !== typeof this[element]) {
        diff.push(element);
      } else if (typeof vehicle[element] === "object") {
        diff.push(vehicle[element].findDiff(this[element]));
      } else if (vehicle[element] !== this[element]) {
        diff.push(element);
      }
    });

    return diff;
  }

  equal(vehicle) {
    return (
      this.identity === vehicle.identity &&
      this.chassisNumber === vehicle.chassisNumber &&
      this.modelYear === vehicle.modelYear &&
      this.typeApprovalNo === vehicle.typeApprovalNo &&
      this.privatelyImported === vehicle.privatelyImported &&
      this.color === vehicle.color &&
      this.registration.equal(vehicle.registration) &&
      this.inspection.equal(vehicle.inspection)
    );
  }
}

module.exports = Vehicle;

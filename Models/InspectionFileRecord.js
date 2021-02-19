const flatten = require("flat");
const Inspection = require("./Inspection");
const Registration = require("./Registration");

const Vehicle = require("./Vehicle");

class InspectionFileRecord {
  constructor(guide) {
    this.guide = guide;
  }
  toVehicle() {
    let vehicle = new Vehicle(
      this.identity.trim(),
      this.chassisNumber.trim(),
      this.modelYear.trim(),
      this.typeApprovalNo.trim(),
      this.privatelyImported.trim(),
      this.color.trim()
    );
    vehicle.inspection = new Inspection(
      this.latestInspectionDate.trim(),
      this.nextInspectionDate.trim()
    );
    vehicle.registration = new Registration(
      this.firstRegistration.trim(),
      this.latestRegistration.trim(),
      this.monthlyRegistration.trim(),
      this.dateOfDeregistration.trim()
    );

    return vehicle;
  }

  fromVehicle(vehicle) {
    if (vehicle instanceof Vehicle) {
      vehicle = flatten(vehicle, {
        transformKey: (key) => (key.indexOf("_") < 0 ? key : ""),
      });

      for (let rule of this.guide) {
        this[rule.name] =
          vehicle[rule.name] !== undefined ? vehicle[rule.name] : "";

        this[rule.name] = this[rule.name].padEnd(rule.range.len, " ");
      }
    } else {
      throw "Given object is not an instance of Vehicle";
    }
  }
}

module.exports = InspectionFileRecord;

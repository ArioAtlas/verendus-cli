"use strict";

class Inspection {
  constructor(latestInspectionDate, nextInspectionDate) {
    this.latestInspectionDate = latestInspectionDate;
    this.nextInspectionDate = nextInspectionDate;
  }

  findDiff(inspection) {
    if (inspection == null || !(inspection instanceof Inspection))
      throw "findDiff() given input is not an instance of Inspection";

    let keys = new Set([...Object.keys(this), ...Object.keys(inspection)]);
    let diff = [];

    keys.forEach((element) => {
      if (inspection[element] !== this[element]) {
        diff.push(element);
      }
    });

    return diff;
  }

  equal(inspection) {
    return (
      this.nextInspectionDate === inspection.nextInspectionDate &&
      this.latestInspectionDate === inspection.latestInspectionDate &&
      this.nextInspectionDate === inspection.nextInspectionDate
    );
  }
}

module.exports = Inspection;

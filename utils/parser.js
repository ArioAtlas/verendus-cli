const { InspectionFileRecord } = require("../Models");

let guide = [
  { name: "identity", range: { start: 1, len: 7 } },
  { name: "chassisNumber", range: { start: 8, len: 19 } },
  { name: "modelYear", range: { start: 27, len: 4 } },
  { name: "typeApprovalNo", range: { start: 31, len: 11 } },
  { name: "firstRegistration", range: { start: 42, len: 8 } },
  { name: "privatelyImported", range: { start: 50, len: 1 } },
  { name: "dateOfDeregistration", range: { start: 51, len: 8 } },
  { name: "color", range: { start: 59, len: 20 } },
  { name: "latestInspectionDate", range: { start: 79, len: 8 } },
  { name: "nextInspectionDate", range: { start: 87, len: 8 } },
  { name: "latestRegistration", range: { start: 95, len: 8 } },
  { name: "monthlyRegistration", range: { start: 103, len: 4 } },
];

const createRecord = () => {
  return new InspectionFileRecord(guide);
};

const parse = (row) => {
  let result = new InspectionFileRecord(guide);
  for (let rule of guide) {
    result[rule.name] = row.substring(
      rule.range.start - 1,
      rule.range.start + rule.range.len - 1
    );
  }
  return result;
};

const stringify = (record) => {
  let str = "";
  Object.values(record).forEach((element) => {
    if (typeof element === "string") str += element;
  });

  return str;
};

module.exports = () => {
  // Sort cut guide based on start index
  guide.sort((a, b) => a.range.start - b.range.start);

  // initial regex patern
  let pattern = "";
  let len = 1;

  for (let rule of guide) {
    if (rule.range.start < len)
      throw `cut guide configuration error, unexpected start position for ${rule.name}. It should be greater than ${len}`;

    pattern += `.{${rule.range.start - len}}[a-zA-Z0-9 ]{${rule.range.len}}`;

    len += len - rule.range.start + rule.range.len;
  }

  //pattern = `/${pattern}/g`;
  var reg = new RegExp(pattern);

  const validate = (row) => {
    if (!reg.test(row)) {
      throw "Invalid item";
    }
  };

  return {
    validate,
    parse,
    stringify,
    createRecord,
  };
};

"use strict";
const fs = require("fs");
const path = require("path");
const { Cli, Parser } = require("./utils");

const parser = Parser();

// Reading inspection report file
try {
  // eslint-disable-next-line no-undef
  const reportFile = path.join(__dirname, Cli.getArg("file"));
  if (fs.existsSync(reportFile)) {
    var readStream = fs.createReadStream(reportFile, { encoding: "utf-8" });
    let remained = null;
    let result = [];
    let errors = [];

    let i = 0;
    readStream.on("data", (data) => {
      // Parse the given chunk to object and add the object to list
      if (remained) {
        data = remained + data;
        remained = null;
      }

      let buffer = data.split("\n");
      buffer.forEach((element, k) => {
        try {
          parser.validate(element);
          result.push(parser.parse(element).toVehicle());
        } catch (error) {
          if (k == buffer.length - 1) {
            remained = element;
          } else {
            errors.push({ line: i, element });
          }
        }
        i++;
      });
    });

    readStream.on("end", () => {
      // Do the process like comarison, adding, updating, ...
      console.log(`${result.length} vehicle have been processed`);
      console.log(`Process finished with ${errors.length} errors`);

      // Do the comparision and update DB
    });

    readStream.on("error", () => {
      // show error
    });
  }
} catch (error) {
  console.log(error);
}

import mongoose from "mongoose";

const _decorator = (schema) => {
  let transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      ret.inspection = ret._inspection;
      ret.registration = ret._registration;
      delete ret._inspection;
      delete ret._registration;
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};

const VehicleSchema = mongoose.Schema(
  {
    identity: {
      type: String,
      required: true,
      index: true,
    },
    chassisNumber: {
      type: String,
      required: true,
    },
    modelYear: {
      type: Number,
      required: true,
    },
    typeApprovalNo: {
      type: Number,
      required: true,
    },
    privatelyImported: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: true,
    },
    _inspection: {
      latestInspectionDate: Number,
      nextInspectionDate: Number,
    },
    _registration: {
      firstRegistration: Number,
      latestRegistration: Number,
      monthlyRegistration: Number,
      dateOfDeregistration: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
VehicleSchema.plugin(toJSON);
VehicleSchema.plugin(_decorator);

export default mongoose.model("Vehicle", VehicleSchema);

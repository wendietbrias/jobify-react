const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobsSchema = new Schema(
  {
    userId: String,
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", jobsSchema);

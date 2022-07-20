const mongoose = require("mongoose");

let stakeholderSchema = mongoose.Schema({
  name: {
    type: String,
  },
  stakeholder: {
    type: String,
  },
  jenis: {
    type: String,
  },
  jumlahDistribusi: {
    type: String,
  },
},{ timestamps: true });

module.exports = mongoose.model("Stakeholder", stakeholderSchema);

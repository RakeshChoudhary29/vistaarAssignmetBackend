// models/Customer.js
const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: String,
    address: String,
    active: Boolean,
    // accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],pp
  })
);

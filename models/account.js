// models/Account.js
const mongoose = require("mongoose");
module.exports = mongoose.model("Account", new mongoose.Schema({
  customerId: mongoose.Schema.Types.ObjectId
}));

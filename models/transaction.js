// models/Transaction.js
const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    accountId: Number,
    amount: Number,
    date: Date,
    product: String,
  })
);

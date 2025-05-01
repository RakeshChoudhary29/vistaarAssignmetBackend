const express = require("express");
const Customer = require("../models/customer");
const Account = require("../models/account");
const Transaction = require("../models/transaction");
const account = require("../models/account");

const router = express.Router();

router.get("/customers", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const pipeline = [
    {
      $match: {
        $or: [{ active: true }, { active: { $exists: false } }],
      },
    },
    {
      $facet: {
        data: [
          { $skip: skip },
          { $limit: limit },
          { $project: { name: 1, address: 1, accounts: 1 } },
        ],
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    },
  ];

  const customers = await Customer.aggregate(pipeline);

  console.log(customers[0]);
  res.json({
    customers: customers?.[0]?.data || [],
    totalCount: customers?.[0]?.totalCount?.[0]?.count || 0,
  });
});

router.get("/transactions/:accountId", async (req, res) => {
  const account_id = req.params.accountId;
  console.log({ account_id });
  // transaction linked to this account

  const transactions = await Transaction.find({
    account_id: Number(account_id),
  });
  res.json(transactions[0]);
});

module.exports = router;

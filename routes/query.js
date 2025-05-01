const account = require("../models/account");
const Transaction = require("../models/transaction");

// . Create a mongo query to list down account ids which has made at least one transaction below the amount 5000

const getAccountList = async () => {
  const pipeline = [
    {
      $match: {
        transactions: {
          $elemMatch: {
            amount: { $lt: 500 },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        account_id: 1,
      },
    },
  ];

  const data = await Transaction.aggregate(pipeline);
};

// Create a mongo query to list down distinct list of products available in the system

const getDistinctProducts = async () => {
  const pipeline = [
    { $unwind: "$products" },
    {
      $group: {
        _id: null,
        allProducts: { $addToSet: "$products" },
      },
    },
    {
      $project: {
        _id: 0,
        products: "$allProducts",
      },
    },
  ];

  const data = await account.aggregate(pipeline);
  console.log(data);
};

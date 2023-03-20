const express = require("express");
const app = express();
const itemRoutes = require("./routes/items");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", itemRoutes);

module.exports = app;

// app.get("/mean", function (req, res, next) {

//   try {
//     if (!req.query["nums"]) throw new CalcError('nums are required', 400)
//     const nums = req.query["nums"].split(",");
//     for (let i = 0; i < nums.length; i++) {
//       const num = parseInt(nums[i])
//       if (!Number.isInteger(num)) throw new CalcError(`${nums[i]} is not a number`, 404)
//     }

//     return res.json({
//       response: {
//         operation: "mean",
//        result: findMean(nums),
//       },
//     });

//   } catch (err) {
//     return next(err);
//   }

// });

// app.get("/median", function (req, res) {
//   const nums = req.query["nums"].split(",")
//   //   .sort((a, b) => parseInt(a) + parseInt(b));
//   // const value = parseInt(nums[Math.round((nums.length - 1) / 2)]);

//   return res.json({
//     response: {
//       operation: "median",
//       result: findMedian(nums)
//     },
//   });
// });

// app.get("/mode", function (req, res) {
//   const nums = req.query["nums"].split(",");
//   const counterObj = {};
//   nums.forEach((num) => {
//     counterObj[num] ? (counterObj[num] += 1) : (counterObj[num] = 1);
//   });

//   const max = Math.max(...Object.values(counterObj));
//   const value = Object.keys(counterObj).find((key) => counterObj[key] === max);

//   return res.json({
//     response: {
//       operation: "mode",
//       value,
//     },
//   });
// });

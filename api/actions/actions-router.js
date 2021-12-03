// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Action.get(req.query)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

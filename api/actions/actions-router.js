// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");
const { checkActionId, validateAction } = require("./actions-middlware");
const router = express.Router();

router.get("/", (req, res, next) => {
  Action.get(req.query.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", checkActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.delete("/:id", checkActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "The action has been deleted" });
    })
    .catch(next);
});

router.put("/:id", checkActionId, validateAction, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

module.exports = router;

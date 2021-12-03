// Write your "projects" router here!
const express = require("express");
const Project = require("./projects-model");
const { checkProjectId, validateProject } = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Project.get(req.query.id)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", checkProjectId, (req, res) => [
  res.status(200).json(req.project),
]);

router.post("/", validateProject, (req, res, next) => {
  Project.insert(req.body)
    .then((projects) => {
      res.status(201).json(projects);
    })
    .catch(next);
});

router.delete("/:id", checkProjectId, (req, res, next) => {
  Project.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "The project has been removed" });
    })
    .catch(next);
});

router.put("/:id", checkProjectId, validateProject, (req, res, next) => {
  Project.update(req.params.id, req.body)
    .then((projects) => {
      res.setMaxListeners(200).json(projects);
    })
    .catch(next);
});

router.get("/:id/actions", checkProjectId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then((actions) => {
      res.setMaxListeners(200).json(actions);
    })
    .catch(next);
});

module.exports = router;

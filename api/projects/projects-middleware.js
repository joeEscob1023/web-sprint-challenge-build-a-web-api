// add middlewares here related to projects
const yup = require("yup");
const Project = require("./projects-model");

async function checkProjectId(req, res, next) {
  try {
    const Projects = await Project.get(req.params.id);
    if (Projects) {
      req.project = Projects;
      next();
    } else {
      next({ status: 404, message: "not found" });
    }
  } catch (err) {
    next(err);
  }
}

const projectSchema = yup.object().shape({
  name: yup
    .string()
    .typeError("name must be a string")
    .trim()
    .required("name is required")
    .min(3, "name must be 3 chars long")
    .max(10, "name should be 10 chars tops")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
});

async function validateProject(req, res, next) {
  try {
    const validated = await projectSchema.validate(req.body, {
      strict: false,
      stripUnknown: true,
    });
    req.body = validated;
    next();
  } catch (err) {
    next({ status: 404, message: err.message });
  }
}

module.exports = {
  checkProjectId,
  validateProject,
};

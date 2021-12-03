// add middlewares here related to actions
const yup = require("yup");
const Action = require("./actions-model");

async function checkActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (action) {
      req.action = action;
      console.log(req.action);
      next();
    } else {
      next({ status: 404, message: "not found" });
    }
  } catch (err) {
    next(err);
  }
}

const actionSchema = yup.object().shape({
  project_id: yup.number().required(),

  name: yup
    .string()
    .typeError("Name must be a string")
    .trim()
    .required("Name is required"),
  description: yup
    .string()
    .typeError("Description must be a string")
    .trim()
    .required("Description is required")
    .max(128, "Description should be at least 128 chars"),
  notes: yup.string(),
  completed: yup.bool(false),
});

async function validateAction(req, res, next) {
  try {
    const validated = await actionSchema.validate(req.body, {
      strict: false,
      stripUnknown: true,
    });
    (req.body = validated), next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
}

module.exports = {
  checkActionId,
  validateAction,
};

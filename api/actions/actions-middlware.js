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
  action: yup
    .string()
    .typeError("Action must be a string")
    .trim()
    .required("Action is required"),
});

async function validateAction(req, res, next) {
  try {
    const validated = await actionSchema.validate(req.body, {
      strict: false,
      stripUnknown: true,
    });
    (req.body = validated), next();
  } catch (err) {
    next({ status: 404, message: err.message });
  }
}

module.exports = {
  checkActionId,
  validateAction,
};

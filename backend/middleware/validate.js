import { validationResult } from "express-validator";

/**
 * Run after express-validator chains. If any validation failed, respond with
 * 400 and a structured list of errors; otherwise continue.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
  });
};

export default validate;

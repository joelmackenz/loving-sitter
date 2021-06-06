const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("username", "Please enter a username").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

exports.validateCreateNotification = [
  check("user").isMongoId().withMessage("User must be valid mongo Object Id"),
  check("type").isIn(["SERVICE_REQUEST", "VIEWED_ACCOUNT"]).withMessage("Type must be VIEWED_ACCOUNT or SERVICE_REQUEST"),
  check("title", "Title is required").notEmpty().isLength({ max: 32 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];

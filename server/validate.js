const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("username", "Please enter a username").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateCreateRequest = [
  check("user_id")
    .isMongoId()
    .withMessage("User Id must be valid mongo Object Id"),
  check("sitter_id")
    .isMongoId()
    .withMessage("User Id must be valid mongo Object Id"),
  check("start_date").isDate({ format: "YYYY-MM-DD" }),
  check("end_date").isDate({ format: "YYYY-MM-DD" }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateCreateNotification = [
  check("user").isMongoId().withMessage("User must be valid mongo Object Id"),
  check("type")
    .isIn([
      "SERVICE_REQUEST",
      "VIEWED_ACCOUNT",
      "SERVICE_ACCEPTED",
      "SERVICE_DECLINED",
    ])
    .withMessage(
      "Type must be VIEWED_ACCOUNT or SERVICE_REQUEST or SERVICE_ACCEPTED or SERVICE_DECLINED"
    ),
  check("title", "Title is required and has a maximum length of 50 chars only.")
    .notEmpty()
    .isLength({ max: 50 }),
  check("description", "Description is required").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

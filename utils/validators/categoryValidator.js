const { check} = require('express-validator');
const validatorMiddleware=require("../../middlewares/validators");
exports.getCategoryValidator=[
    check('id').isMongoId().withMessage("invalid category id format "),
    validatorMiddleware,
];

exports.createCategoryValidator=[
    check("name").notEmpty().withMessage("category required")
    .isLength({min:3}).withMessage("too short category name")
    .isLength({max:32}).withMessage("too long category name"),
    validatorMiddleware,
];


exports.UpdateCategoryValidator=[
    check('id').isMongoId().withMessage("invalid category id format "),
    validatorMiddleware,
];

exports.deleteCategoryValidator=[
    check('id').isMongoId().withMessage("invalid category id format "),
    validatorMiddleware,
];
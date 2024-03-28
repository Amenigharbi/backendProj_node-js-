const { check} = require('express-validator');
const validatorMiddleware=require("../../middlewares/validators");
exports.getBrandValidator=[
    check('id').isMongoId().withMessage("invalid Brand id format "),
    validatorMiddleware,
];

exports.createBrandValidator=[
    check("name").notEmpty().withMessage("Brand required")
    .isLength({min:3}).withMessage("too short category name")
    .isLength({max:32}).withMessage("too long category name"),
    validatorMiddleware,
];


exports.UpdateBrandValidator=[
    check('id').isMongoId().withMessage("invalid Brand id format "),
    validatorMiddleware,
];

exports.deleteBrandValidator=[
    check('id').isMongoId().withMessage("invalid Brand id format "),
    validatorMiddleware,
];
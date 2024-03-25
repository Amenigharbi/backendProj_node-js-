const { check} = require('express-validator');
const validatorMiddleware=require("../../middlewares/validators");
exports.getCategoryValidator=[
    check('id').isMongoId().withMessage("invalid category id format "),
    validatorMiddleware,
];

exports.createCategoryValidator=[];
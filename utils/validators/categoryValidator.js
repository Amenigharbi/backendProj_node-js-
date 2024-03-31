const { check,body} = require('express-validator');
const validatorMiddleware=require("../../middlewares/validators");
const slugify=require('slugify');
exports.getCategoryValidator=[
    check('id').isMongoId().withMessage("invalid category id format "),
    validatorMiddleware,
];

exports.createCategoryValidator=[
    check("name").notEmpty().withMessage("category required")
    .isLength({min:3}).withMessage("too short category name")
    .isLength({max:32}).withMessage("too long category name")
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleware,
];


exports.UpdateCategoryValidator=[
    check('id').isMongoId().withMessage("invalid category id format "),
    body('name').custom((val,{req})=>
    {
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleware,
];

exports.deleteCategoryValidator=[
    check('id').isMongoId().withMessage("invalid category id format "),
    validatorMiddleware,
];
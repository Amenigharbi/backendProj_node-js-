const { check,body} = require('express-validator');
const validatorMiddleware=require("../../middlewares/validators");
const slugify=require('slugify');
exports.getSubCategoryValidator=[
    check('id').isMongoId().withMessage("invalid Subcategory id format "),
    validatorMiddleware,
];

exports.createSubCategoryValidator=[
    check("name").notEmpty().withMessage("Subcategory required")
    .isLength({min:2}).withMessage("too short Subcategory name")
    .isLength({max:32}).withMessage("too long Subcategory name")
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    check('category').notEmpty().withMessage("subcategory must belong to category")
    .isMongoId().withMessage('invalid category id format'),
    
    validatorMiddleware,
];


exports.UpdateSubCategoryValidator=[
    check('id').isMongoId().withMessage("invalid Subcategory id format "),
    body('name').custom((val,{req})=>
    {
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleware,
];

exports.deleteSubCategoryValidator=[
    check('id').isMongoId().withMessage("invalid Subcategory id format "),
    validatorMiddleware,
];
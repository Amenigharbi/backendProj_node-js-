const { check,body} = require('express-validator');
const slugify=require('slugify');
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
    body('name').custom((val,{req})=>{
       req.body.slug=slugify(val);
       return true;
    }),
    validatorMiddleware,
];

exports.deleteBrandValidator=[
    check('id').isMongoId().withMessage("invalid Brand id format "),
    validatorMiddleware,
];
const asyncHandler = require("express-async-handler");
const ApiError=require('../utils/apiError');
const ApiFeatures=require('../utils/apiFeatures');

exports.deleteOne=(Model)=>
asyncHandler(async (req, res,next ) => {
    const { id } = req.params;
    const document= await Model.findOneAndDelete(id);
  
    if (!document) {
      return next(new ApiError( `no category for this id ${id}` ,404));
    }
    res.status(204).send();
  });

exports.updateOne=(Model)=>asyncHandler(async (req, res,next) => {
    const brand = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true }
    );
  
    if (!brand) {
      return next(new ApiError( `no brand for this id ${req.params.id}` ,404));
    }
    res.status(200).json({ data: brand });
  });
  

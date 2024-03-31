const asyncHandler = require("express-async-handler");
const ApiError=require('../utils/apiError');
const ApiFeatures=require('../utils/apiFeatures');

exports.deleteOne=(Model)=>
asyncHandler(async (req, res,next ) => {
    const { id } = req.params;
    const document= await Model.findOneAndDelete(id);
  
    if (!document) {
      return next(new ApiError( `no doc for this id ${id}` ,404));
    }
    res.status(204).send();
  });

exports.updateOne=(Model)=>asyncHandler(async (req, res,next) => {
    const newdoc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true }
    );
  
    if (!newdoc) {
      return next(new ApiError( `no doc for this id ${req.params.id}` ,404));
    }
    res.status(200).json({ data: brand });
  });
  
exports.createOne=(Model)=>asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });
  
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

exports.updateOne=(Model)=>

asyncHandler(async (req, res,next) => {
    const newdoc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true }
    );
  
    if (!newdoc) {
      return next(new ApiError( `no doc for this id ${req.params.id}` ,404));
    }
    res.status(200).json({ data: newdoc });
  });
  
exports.createOne=(Model)=>
asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });
  

exports.getOne=(Model)=>
asyncHandler(async (req, res,next) => {
    const { id } = req.params;
    const doc = await Model.findById(id);
    if (!doc) {
      return next(new ApiError( `no document for this id ${id}` ,404));
    }
    res.status(200).json({ data: doc});
  });


exports.getAll=(Model,ModelName="")=>
  {
  
    asyncHandler(async (req, res) => {
        let filter={};
        if(req.filterObj){filter=req.filterObj}
    //build query 
    const documentsCounts=await Model.countDocuments();
    const apiFeatures=new ApiFeatures(Model.find(filter),req.query).pagination(documentsCounts).filter().search(ModelName).limitFields().sort();
 
    const{mongooseQuery,paginationResult}=apiFeatures;
    const doc=await mongooseQuery;
    res.status(200).json({ results: doc.length, paginationResult,data: doc });
 });
  }
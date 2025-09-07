
const { cache } = require("react");
const enquiryModel = require("../../model/enquirymodel");


let enquiryInsert = async (req,res)=>{
    try{
      let {name,email,phone ,message}=req.body;
      let enquiry = new enquiryModel({
        name,
        email,
        phone,
        message,

      });
      await enquiry.save();
      res.send({status:1,mesaage:"enquiry saved successfully"})
    }catch(err){
     res.send({status:0 , message:"message error",error:err});
    }
}
let enquiryList=async(req,res)=>{

  let enquiry = await enquiryModel.find();
  res.send({status:1 , enquirylist:enquiry})
}
let enquiryDelete = async(req,res)=>{
  try{
   let enID = req.params.id;
   if(!enID){
    return res.status(400).send({status:0, message: "Id not provided"})

   } 
   let enquiry = await enquiryModel .deleteOne({_id:enID});
   res.send({status:1 , enquirydelete : enquiry})
  }catch (err){
  res.status(500).send ({status:0 , message:err.mesaage})
  }
}; 
let enquiryFind = async(req,res)=>{
  let enID= req.params.id;
  let enquiry = await enquiryModel.findOne({_id:enID})
  res.send({status:1 , enquiry})
}
let enquiryUpdate= async(req,res)=>{
  try{
  let enquiryId=req.params.id
      let {name,email,phone ,message}=req.body;
      let updateObj={
        name,
        email,
        phone,
        message
      };
      let updateRes = await enquiryModel.updateOne({_id:enquiryId},updateObj)
      res.send({status:1 , message:"Enquiry updated successfully" , updateRes})
    }catch(err){
      res.send({status:0 , message:"Enquiry is not updated" , error:err})
    }
    }

module.exports = {enquiryInsert , enquiryList , enquiryDelete, enquiryFind,enquiryUpdate};
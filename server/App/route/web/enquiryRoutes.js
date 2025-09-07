let express = require("express");
const { enquiryInsert, enquiryList, enquiryDelete, enquiryFind, enquiryUpdate} = require("../../controller/web/enquiryController");

let enquiryroute = express.Router()

enquiryroute.post("/insert" , enquiryInsert)
enquiryroute.get("/view" , enquiryList)
enquiryroute.delete("/delete/:id" , enquiryDelete)
enquiryroute.get("/find/:id" , enquiryFind)
enquiryroute.put("/update/:id",enquiryUpdate)



module.exports = enquiryroute;
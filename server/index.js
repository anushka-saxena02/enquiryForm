let express=require("express")
let mongoose = require("mongoose");
const enquiryroute = require("./App/route/web/enquiryRoutes");
let cors = require("cors");
require("dotenv").config();

let app = express();
app.use(cors());
app.use(express.json());
  

app.use("/website/api" ,enquiryroute);


mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("mongoose are connected")
    app.listen(process.env.PORT,()=>{
        console.log("Running port is "+ process.env.PORT)
    })
})
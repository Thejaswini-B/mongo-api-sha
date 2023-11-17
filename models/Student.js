const mongoose=require("mongoose") 

const studentSchema=new mongoose.Schema({
    // name, age, phone, city 
    name:{
        type:String,
        required:true
    }, 
    age:{
        type:Number, 
        required: true 
    }, 
    phone:{
        type:Number, 
        required:true 
    }, 
    city:{
        type:String, 
        
    }
}) 

module.exports=mongoose.model("Student",studentSchema);
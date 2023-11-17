const Student=require("../models/Student") 

const createStudent=async(req,res)=>{
    try{
        const {name,age,phone,city}=req.body 
        const student=new Student({
            name,
            age,
            phone,
            city 
        }) 
        await student.save() 
        res.status(201).json(student) 
    } catch (error){
        console.log("error:", error) 
        res.status(500).json({message:"server error"})
    }
} 

const getStudent=async(req, res)=>{
    try{
        const student =await Student.find() 
        res.status(200).json(student)
    }
    catch(error){
        console.log("error:",error)
        res.status(500).json({messsage:"server error"})
    }

} 
const singleStudent=async(req,res)=>{ 
    try{
        const student=await Student.findById(req.params.id)

        if(!student){
            return res.status(402).json({messsage: "student not found"})
        } 
        res.status(201).json(student) 
    }
    catch(error){
        console.log("error", error)
        res.status(500).json({message:"server error"})
    }  
}
const updateStudent=async(req,res)=>{
    try{
        const {name,age, phone,city}=req.body

        const myStudent=await Student.findByIdAndUpdate(
            req.params.id,{name,age,phone,city}
        ) 
        if(!myStudent){
            return res.status(404).json({message:"Student not found"})
        } 
        res.status(200).json(myStudent)
    } 
    catch(error){
        console.log("error", error)
        res.status(500).json({message:"server error"})
    }  
} 
const deleteStudent=async(req, res)=>{
    try{
        const deleteStudent =await Student.findByIdAndDelete(req.params.id) 
        res.status(200).send()
        console.log("deleted")
    }
    catch(error){
        console.log("error:",error)
        res.status(500).json({messsage:"server error"})
    }

} 


module.exports={createStudent,getStudent,singleStudent,updateStudent,deleteStudent}
import mongoose from "mongoose";

class AdminUserModel{
    constructor(){
        this.schema=new mongoose.Schema({
            fullName:{type:String,required:true},
            email:{type:String,required:true,unique:true},
            password:{type:String,required:true},
            role:{type:String,required:true}

        },{timestamps:true})
    }
}

const adminUser=new AdminUserModel()
const adminUserModel=mongoose.model("tbl_Admins",adminUser.schema)
export default adminUserModel

// module.exports = adminUserModel
import mongoose from "mongoose";

class UserModel{
    constructor(){
        this.schema=mongoose.Schema({
            firstName:{type:String,require:true,length:20},
            lastName:{type:String,require:true,length:20},
            email:{type:String,require:true,unique:true},
            phone:{type:String,require:true,length:10,default:null},
            password:{type:String,require:true},
            isAdmin:{type:Boolean,require:true,default:false},

        },{timestamps:true})
    }
}

const User=new UserModel()
const userModal=mongoose.model("tbl_users",User.schema)

export default userModal



import mongoose from "mongoose";

class OrderModel{
    constructor(){
        this.schema=new mongoose.Schema({
            products:{type:Array, require:true},
            user:{type:Object, require:true},
            paymentMethod:{type:String, require:true, default:"cod"},
            paymnetStatus:{type:String, require:true, default:"pending"},
            price:{type:Number, require:true},
            totalprice:{type:Number, require:true},
            Shippingaddress:{type:Object, require:true},
            delivertStatus:{type:String, require:true, default:"pending"},
            deliverdIn:{type:Date, require:true}, 

        },{timestamps:true})
    }
}

const order=new OrderModel()
const orderModel= mongoose.model("tbl_order",order.schema)

export default orderModel
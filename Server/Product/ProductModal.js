import mongoose from "mongoose"

class ProductModal {
    constructor(){  
        
        this.schema=new mongoose.Schema(
        {
            name:{type:String,require:true},
            alias:{type:String,require:true,unique:true},
            category:{type:String,require:true},
            image:{type:String,require:true},
            price:{type:Number,require:true},
            color:{type:String,require:true},
            rating:{type:Number,require:true},
            numReviews:{type:String,require:true},
            description:{type:String,default:null},
            brand:{type:String,require:true},
            countInStock:{type:Number,require:true}
        }
        )
    }
}


const product = new ProductModal()
const productmodal = mongoose.model("tbl_product",product.schema)
export default productmodal
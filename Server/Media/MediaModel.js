import mongoose from "mongoose"

class MediaModel{
    constructor(){
        this.schema=new mongoose.Schema({
            name: { type: String, required: true },
            mimetype: { type: String, required: true },
            extension: { type: String, required: true },
            path: { type: String, required: true },
            size: { type: String, required: true },
            // rendersize: { type: String, default: null },
            uploadedby: { type: String }
        },{timestamps:true})
    }
}
const Media=new MediaModel()
const mediaModel=mongoose.model("tbl_Media",Media.schema)
export default mediaModel
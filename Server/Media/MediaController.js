// const Randomstring = require("randomstring")
// const fs = require("fs");
// const mediaModel = require("./MediaModel");
import Randomstring from "randomstring";
import fs from "fs";
import mediaModel from "./MediaModel.js";

class MediaController {
    async GetMedia(req, res) {
        try {
            // console.log(req.files)
            const file = req.files.file;
            let { mimetype, size } = file
            let name = file.name

            let extension = name?.split(".")
            extension = extension[extension.length - 1]
            console.log(extension)

            name = Randomstring.generate({
                length: 12,
                charset: "alphabetic"
            }).toLowerCase()

            name = name + "." + extension
            file.name = name
            mimetype = mimetype.split("/")[0]
            console.log(mimetype)

            if (mimetype !== "image" && mimetype !== "video") {
                mimetype = "application"
            }

            const folderName = `./uploads/${mimetype}`

            try {
                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName)
                }
            } catch (error) {
                console.log(error)
            }

            let path = `./uploads/${mimetype}/${name}`
            const result = await file.mv(path)
            console.log(result)
            path=path.substring(1,path.length)
            console.log(path)

            let Media = await mediaModel.create({ name, mimetype, size, path, extension })
            console.log(Media)

            Media=Media._doc
            let url=`http://localhost:5000${path}`
            Media.url=url
            console.log(Media)


            res.json({ message: "Success", media: Media })

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })

        }
    }

    async ShowMedia(req,res){
        try {
            const result = await mediaModel.aggregate([
                {
                  $match: {
                    $or: [
                      { mimetype: "image" },
                      { mimetype: "video" }
                    ]
                  }
                },
                {
                  $addFields: {
                    url: {
                      $concat: [
                        "http://localhost:5000",
                        "$path"
                      ]
                    }
                  }
                }
              ]);
              if (result) {
                return res.status(200).send({ message: "success",result})
            } return res.status(400).send({ message: "something went wrong" })  


        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }
}
const mediaController = new MediaController()
export default mediaController

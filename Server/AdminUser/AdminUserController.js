import adminUserModel from "./AdminUserModel.js"
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import validation from "../User/Validation.js";

class AdminUserController{
  
    async CreateAdminUser(req, res) {
        try {
            const validationResult = validation(req.body,"adminUser")
            console.log(validationResult);
            if(validationResult.length > 0){
                return res.status(400).send({message:"validation Error",validationResult:validationResult})
            }
            const { password } = req.body
            // console.log( { firstName, lastName, email, password });
            const EncodePassword = bcrypt.hashSync(password, 8)
            if(!EncodePassword){
                return res.status(500).send({message:"something went wrong"})
            }


            req.body.password = EncodePassword

            const result = await adminUserModel.create(req.body)
            if(!result){
                return res.status(500).send({message:"something went wrong"})
            }
            let user=result._doc
            delete user.password
            console.log(result);
            const token=Jwt.sign({...user, password:undefined} , process.env.JWT_SECRATE, {expiresIn:"30d"})
            if(!token) return res.status(500).send({message:"something went wrong"})
            // result.token=token
            return res.status(200).send({message:"success", user:{...user,token:token}})

        } catch (error) {
            console.log(error);
            if(error && error.message && error.message.includes("E11000")){
                return res.status(400).send({message:"validation Error",validationResult:[{key:"email",message:"Email is Already exsits"}]})

            }
            return res.status(500).send({message:"internal server error"})
        }
    }

    async AdminLogin(req, res) {
        try {
            const { email, password } = req.body
            // if (!email) return res.status(400).send({ message: "Missing dependency Email" })
            // if (!password) return res.status(400).send({ message: "Missing dependency password" })

            const ValidationResult=validation(req.body,"login")
            if(ValidationResult.length > 0){
                return res.status(400).send({message:"Validation Error",validationResult:ValidationResult})
            }
            const result = await adminUserModel.findOne({ email: email })
            console.log(result)

            // const user=result ? result._doc:
            if (!result) {
                // return res.status(400).send({ message: "Email not found" })
                return res.status(400).send({message:"validation Error",validationResult:[{key:"email",message:"Email not found"}]})

            }
            const user = {
                _id:result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                phone: result.phone,
                password: result.password,
                createdAt: result.createdAt,
                isAdmin: result.isAdmin,
                updatedAt: result.updatedAt
            }

            if (!(bcrypt.compareSync(password, user.password))) {
                // return res.status(400).send({ message: "Password not match" })
                return res.status(400).send({message:"validation Error",validationResult:[{key:"password",message:"Email and Password are not match"}]})

            }

            delete user.password
            const token = Jwt.sign({
                ...user
            }, process.env.JWT_SECRATE, { expiresIn: "30d" })
            // console.log(token);
            if (token) {
                return res.status(200).send({ message: "success", user: { ...user, token: token } })
            } return res.status(500).send({ message: "something went wrong" })
        } catch (error) {
            // console.log(error);
            return res.status(500).send({ message: "Internal server error" })
        }
    }
   

    async GetAdminUser(req,res){
        try {
            const result=await adminUserModel.find({})
            if(!result) return res.status(400).send({ message: "Something went wrong" })

                return res.status(200).send({ message: "success",user:result })
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })

        }
    }

    async removeUser(req, res) {
        try {
            const result = await adminUserModel.deleteOne({ _id: req.params.id })
            console.log(result)
            if (result) return res.status(200).send({ message: "Success" })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal Server error" })
        }
    }

    async updateuser(req,res){
        try {
            const id=req.params.id
            const body=req.body
            const result=await adminUserModel.updateOne({_id:id},body)
            console.log(result)
            if(result.modifiedCount > 0 || result.matchedCount > 0) return res.status(200).send({message:"Success"})

            return res.status(400).send({message:"Something went wrong"})
        } catch (error) {
            console.log(error)
            return res.status(500).send({message:"Internal server error"})

        }
    }

}

const adminUserController=new AdminUserController()
export default adminUserController

import jwt from "jsonwebtoken"

class AuthController{
    async CreateOrderAuth(req,res,next){
        console.log(req.headers)
        try {
            const {token}=req.headers
            console.log(token)
            if(!token) return res.status(401).send({message:"unauthorized"})
            return jwt.verify(token,process.env.JWT_SECRATE,(err,data)=>{
                if(data){
                    req.body.userInfo=data
                    return next()
                }
                if(err){
                    console.log(err)
                    return res.status(401).send({message:"unauthorized"})
                }
            })
        } catch (error) {
            return res.status(500).send({message:"Internal server error"})
        }
    }
}

const authController = new AuthController()
export default authController
import { Router } from "express";
import adminUserController from "./AdminUser/AdminUserController.js";
import mediaController from "./Media/MediaController.js";

const AdminRouter=Router()
AdminRouter.post("/upload",mediaController.GetMedia)
AdminRouter.get("/show",mediaController.ShowMedia)

AdminRouter.post("/adduser",adminUserController.CreateAdminUser)
AdminRouter.post("/login",adminUserController.AdminLogin)
AdminRouter.get("/getuser",adminUserController.GetAdminUser)
AdminRouter.delete("/remove/:id",adminUserController.removeUser)
AdminRouter.put("/update/:id",adminUserController.updateuser)



export default AdminRouter
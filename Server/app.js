import express, { json } from "express";
import cors from "cors";
import productController from "./Product/ProductController.js";
import ConnectDb from "./Connection.js";
import userController from "./User/UserController.js";
import {} from "dotenv/config"
import orderController from "./Order/OrderController.js";
import authController from "./Auth/Auth.js";
import AdminRouter from "./AdminRouter.js";
import fileUpload from "express-fileupload";

const app = express()
ConnectDb()
app.use(cors())
app.use(json())
app.use(fileUpload())

app.use("/uploads", express.static("./uploads"))

app.get("/", (req, res) => {
    return res.status(200).send({ message: "success" })
});

app.use("/admin",AdminRouter)

app.get("/product", productController.getProduct)
app.get("/product/:id", productController.getProductByID)
app.get("/product/insert/many", productController.insertMany)
app.post("/cart", productController.Getcart)

app.post("/user/register", userController.RegistrationUser)

app.post("/user/login", userController.UserLogin)

app.post("/orderauth",authController.CreateOrderAuth, orderController.createOrder)
app.post("/order",authController.CreateOrderAuth, orderController.GetOrder)
app.post("/order/:id",authController.CreateOrderAuth,orderController.getOrderByID)
app.post("/payment/verify",authController.CreateOrderAuth,orderController.PaymentVerify)




app.listen(process.env.PORT, () => {
    console.log("Server started");
})




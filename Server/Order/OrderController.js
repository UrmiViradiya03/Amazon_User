import DeliveryDay from "../Constant.js"
import orderModel from "./OrderModel.js";
import Razorpay from "razorpay";


function CreateRazorPayOrder(options) {
    return new Promise((resolve, reject) => {
        var instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE,
        });
        instance.orders.create(options, (err, order) => {
            if (err) return reject(err)
            resolve(order)
        })
    })
}


class OrderController {
    async createOrder(req, res) {
        try {
            const { products, userInfo, totalPrice, paymentMethod, Shippingaddress } = req.body

            if (!products) {
                return res.status(400).send({ message: "Missing dependency product" })
            }
            if (!paymentMethod) {
                return res.status(400).send({ message: "Missing dependency paymentMethod" })
            }
            if (!Shippingaddress) {
                return res.status(400).send({ message: "Missing dependency shippingaddress" })
            }

            
            const deliveryDate = new Date()
            deliveryDate.setDate(deliveryDate.getDate() + DeliveryDay)

            const orderDetails = {
                products,
                userInfo: userInfo,
                paymentMethod: paymentMethod,
                totalPrice: totalPrice,
                Shippingaddress,
                deliverdIn: deliveryDate
            }

            let order = await orderModel.create(orderDetails)
            order = { ...order._doc, RazorpayDetails: null }
        
            console.log(order)

            if (paymentMethod === "cod") {
                if (!order) return res.status(500).send({ message: "Something went wrong" })
                return res.status(200).send({ message: "Success", order })
            } else {
                const options = {
                    amount: totalPrice * 100,
                    currency: "INR",
                    receipt: "rcpt_id_" + order._id
                }
                const RozerPayResult = await CreateRazorPayOrder(options)
                if (!RozerPayResult) return res.status(500).send({ message: "Something went wrong" })
                order = {
                    ...order,
                    RazorpayDetails: { ...RozerPayResult, apikey: process.env.API_KEY }
                }
                return res.status(200).send({ message: "Success", order })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async GetOrder(req, res) {
        try {
            const result = await orderModel.find({"user._id":req.body.userInfo._id})
            console.log(result)

            if (result) return res.status(200).send({ message: "success", order: result })
            return res.status(500).send({ message: "something went wrong" })

        } catch (error) {
            console.log(error.message)
            return res.status(500).send({ message: "something went wrong" })

        }
    }

    async getOrderByID(req, res) {
        try {
            const { id } = req.params

            if (!id) {
                return res.status(400).send({ message: 'Bad Request' })
            }

            const result = await orderModel.findById({ _id: id })

            if (result) {
                return res.status(200).send({ message: "success", order: result })

            }
            return res.status(500).send({ message: 'something went wrong' })

        } catch (error) {
            return res.status(500).send({ message: 'internal server error' })

        }

    }

    async PaymentVerify(req, res) {0
        const { razorpay_payment_id, razorpayOrderId, orderId } = req.body
       
        const instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE,
        })

        try {

            const response = await instance.payments.fetch(razorpay_payment_id)

            if ((response.status === "captured" || response.status === "authorized") && response.order_id === razorpayOrderId) {

                const update = await orderModel.updateOne({ _id: orderId }, { paymentStatus: "verify" })
                if (update.modifiedCount > 0) {
                    return res.status(200).send({ message: "Success", orderId: orderId })
                }
                return res.status(500).send({ message: "Somthing Went Wrong" })

            } else {
                await orderModel.updateOne({ _id: orderId }, { paymentStatus: "reject" })

                return res.status(400).send({ message: "Payment Verification Failed" })
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal Server Error" })
        }
    }

}

const orderController = new OrderController()
export default orderController
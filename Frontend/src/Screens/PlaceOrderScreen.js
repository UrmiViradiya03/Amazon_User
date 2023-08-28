import { useEffect, useState } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import apiHelper from "../Common/ApiHelper.js";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import HandlePayment from "./LoadRozerPay";

export default function PlaceOrderScreen(props) {
    let { setcartItems, cartItems } = props
    const [cart, setCart] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate=useNavigate()
   


    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")

    const location=useLocation()
    const redirect=location.search.split("?redirect=")[1]
    
    const [SummaryDetails, setsummaryDetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0,
    })
    // console.log(cart)
    
    useEffect(() => {
        let i = 0
        let totalPrice = 0
        let totalItems = 0
        let totalProducts = 0

        while (i < cart.length) {
            if(cart[i].countInStock>0){
                totalItems += cart[i].count
                totalPrice += (cart[i].count * cart[i].price)
                totalProducts++

            }
            i++
        }
        setsummaryDetails({ ...SummaryDetails, totalItems: totalItems, totalAmount: totalPrice, totalProducts: totalProducts })
    }, [cart])
    
   

    useEffect(() => {
        cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
        setcartItems(cartItems)
    }, [])

    const getCart = async () => {
        try {
            
            setisLoading(true)
            const products = cartItems.map((x) => x.product)
            const result = await apiHelper.fetchCart(products)
            const InstockItems = result.data?.products.filter((Item)=>{
                return Item.countInStock > 0
            })
           

            let i = 0
            while (i < cartItems.length) {
                let j = 0
                while (j < InstockItems.length) {
                    if (cartItems[i].product === InstockItems[j]._id) {
                        InstockItems[j].count = cartItems[i].count
                    }
                    j++
                }
                i++
            }

            setCart(InstockItems)

            setisLoading(false)
        } catch (error) {
            setCart([])
            setisLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
            setError(error.message)
            return
        }
    }

    useEffect(() => {
        getCart()
    }, [])
   
    const PlaceOrderHandler = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]")

            const paymentMethod = redirect && redirect === "online" ? "online" : "cod"
    
            const products = cart.map(({ _id,count, price }) => ({ _id, count, price }))
            const OrderDetails = {
                userInfo: userInfo,
                paymentMethod: paymentMethod,
                products: products,
                Shippingaddress: userInfo.user.Address,
                totalPrice: SummaryDetails.totalAmount
            }
    
            // eslint-disable-next-line
            const result = await apiHelper.placeorder(OrderDetails)
            console.log(result);  
           

            if (!result.data.order.RazorpayDetails) {
                return navigate("/order" + result.data.order._id)
            } else {

                const data = result.data.order
                const Options = {
                    Name: data.Shippingaddress.fullName,
                    phone: data.Shippingaddress.mobile,
                    email: data.Shippingaddress.email,
                    address: data.Shippingaddress.Address,
                    apikey: data.RazorpayDetails.apikey,
                    amount: data.RazorpayDetails.amount,
                    currency: data.RazorpayDetails.currency,
                    razorpayOrderId: data.RazorpayDetails.id,
                    orderId: data._id,
                    showError: setError,
                    navigate: Navigate
                }
                HandlePayment(Options)
            }      
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container py-4">
                <CheckoutSteps signin={true} shipping={true} payment={true} placeorder={true} />
               
                <section className="h-100 gradient-custom">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-md-8">
                                <div className="card mb-4 border-0 bg-warning shadow">
                                    <div className="card-header py-3 bg-warning ">
                                        <h5 className="mb-0 warning">Review Your Order</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row ">
                                            <div className="col  mb-lg-0 ">


                                                <h5>Shipping Imformation</h5>
                                                <div className="address d-flex mb-0 mt-4 mb-0 ">
                                                    <h6>Name:</h6>
                                                    <p className="ms-3">{userInfo.user.fullName}</p>
                                                </div>
                                                <div className="address d-flex " style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                    <h6>Address:</h6>
                                                    <p className="ms-3">{userInfo.user.Address}</p>
                                                </div>
                                                <div className="address d-flex " style={{ marginTop: "10px", marginBottom: "-20px" }}>
                                                    <h6>Phone no:</h6>
                                                    <p className="ms-3">{userInfo.user.phone}</p>
                                                </div>



                                            </div>

                                        </div>

                                        <hr className="my-4" />



                                        <div className="row">

                                            <div className="col  mb-lg-0">
                                                <h5>Payment Imformation</h5>
                                                <div className="address d-flex mb-0 mt-4 mb-0">
                                                    <h6>Payment Method:</h6>
                                                    <p className="ms-3">{redirect && redirect === "online" ? "online" : "cod"}</p>
                                                </div>

                                            </div>
                                        </div>

                                        <hr className="my-4" />
                                        <h5 className="mb-4">Order Imformation</h5>

                                        {
                                            cart.map((x) => {
                                                return (
                                                    <>
                                                        <section className="h-100" style={{ backgroundColor: "#eee" }}>
                                                            <div className="container py-3 h-100">
                                                                <div className="row d-flex justify-content-center align-items-center h-100">
                                                                    <div className="col">
                                                                        <div className="card shadow">
                                                                            <div className="card-body p-4">

                                                                                <div className="row">

                                                                                    <div className="d-flex flex-row align-items-center text-center  justify-content-between  ">
                                                                                        <div>
                                                                                            <img
                                                                                                src={x.image}
                                                                                                className="img-fluid rounded-3" alt="Shopping item" style={{ height: "5rem" }} />
                                                                                        </div>
                                                                                        <div className="ms-3 ">
                                                                                            <h5 className="mb-3">Name</h5>
                                                                                            <h5>{x.name}</h5>
                                                                                        </div>
                                                                                        <div className="ms-3 ">
                                                                                            <h5 className="mb-3">Quantity</h5>
                                                                                            <h5>{x.count}</h5>
                                                                                        </div>
                                                                                        <div className="ms-3 px-4">
                                                                                            <h5 className="mb-3">Price </h5>
                                                                                            <h5>${x.price}</h5>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </section>

                                                    </>

                                                )

                                            })
                                        }



                                        <hr className="my-4" />
                                    </div>
                                </div>


                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4 shadow">
                                    <div className="card-header py-3 bg-warning">
                                        <h5 className="mb-0 ">Order Summary</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Items
                                                <span>{SummaryDetails.totalItems}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0  px-0">
                                                Delivery
                                                <span>{SummaryDetails.delivery}</span>
                                            </li>

                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                                                Total
                                                <span>${SummaryDetails.totalAmount}</span>
                                            </li>
                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                                                Discount
                                                <span>$53.98</span>
                                            </li>

                                            <li
                                                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Order Total </strong>

                                                </div>
                                                <span><strong>${SummaryDetails.totalAmount
                                                }</strong></span>
                                            </li>
                                        </ul>
                                        <div className="button justify-content-center ">

                                            <button type="button " onClick={PlaceOrderHandler}className="btn btn-outline-warning btn-lg w-100">Place your order</button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}
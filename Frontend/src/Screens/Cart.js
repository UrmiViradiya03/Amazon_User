import { useEffect, useState } from "react"
import apiHelper from "../Common/ApiHelper"
import Loader from "../Components/Loading"
import MessageBox from "../Components/MessageBox"
import { useNavigate } from "react-router-dom"

export default function Cart(props) {
    let { setcartItems, cartItems } = props
    const [cart, setCart] = useState([])
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")
    const [count, setCounter] = useState(0)
    const [product, setProduct] = useState([])

    const [SummaryDetails, setsummaryDetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0,
    })
    
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
            const products = cartItems.map((x) => x.product)
            console.log(products)

            setisLoading(true)
            const result = await apiHelper.fetchCart(products)
            console.log(result)
            const InstockItems = result.data?.products


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
    })



    const RemoveHandler = (id) => {
        cartItems = cartItems.filter((x) => x.product !== id)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        setcartItems(cartItems)
        getCart()
    }
    
    const CheckoutHandler = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login?redirect=shipping")
        }else{
            navigate("/shipping?redirect=payment")
        }

       
    }
    
    return (
        <>

            <section className="h-100 gradient-custom">
                <Loader isLoading={isLoading} />
                <MessageBox error={error} seterror={setError} />
                {
                    cart.length <= 0 ? (
                        <h6 className="text-danger">Cart is Empty</h6>
                    ) :


                        <div className="container py-5 " >
                            <div className="row d-flex justify-content-center my-4">
                                <div className="col-md-8">
                                    <div className="card mb-4">
                                        <div className="card-header py-3">
                                            <h5 className="mb-0">Cart - 2 items</h5>
                                        </div>

                                        {
                                            cart && cart.map((x, key) => {
                                                return (
                                                    <div className="card-body">

                                                        <div className="row" key={key}>
                                                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                               

                                                                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                                    <img src={x.image}
                                                                        className="w-100" alt="Blue Jeans Jacket" />
                                                                    <a href="#!">
                                                                        <div className="mask" style={{ background: "rgba(251, 251, 251, 0.2)" }}></div>
                                                                    </a>
                                                                </div>
                                                               

                                                            </div>

                                                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">

                                                                <p><strong>{x.name}</strong></p>
                                                                <p>Color: blue</p>
                                                                <p>Size: M</p>
                                                                <p>
                                                                    {x.countInStock > 0 ? (

                                                                        <span className="fs-6 success" style={{ color: '#20a020' }}>In stock</span>
                                                                    ) : (
                                                                        <span className="fs-6 error" style={{ color: '#a02020' }}>Unavailable</span>

                                                                    )}
                                                                </p>
                                                                <button type="button" className="btn btn-primary btn-sm me-1 mb-2" onClick={() => RemoveHandler(x._id)} data-mdb-toggle="tooltip"
                                                                    title="Remove item">
                                                                    <i className="fas fa-trash" style={{ background: "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))" }}></i>
                                                                </button>


                                                            </div>

                                                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                                                                <div className="d-flex mb-4" style={{ maxwidth: "300px" }}>

                                                                    <select disabled={x.countInStock <= 0} value={x.count} className="bg-gradient bg-light rounded" style={{ minWidth: "70px" }}
                                                                        onChange={(e) => {
                                                                            cart[key].count = Number(e.target.value)
                                                                            setCart([...cart])

                                                                            let tmp = cart.map((x) => {
                                                                                return {
                                                                                    product: x._id,
                                                                                    count: x.count
                                                                                }
                                                                            })
                                                                            localStorage.setItem("cartItems", JSON.stringify(tmp))
                                                                        }}
                                                                    >
                                                                        {
                                                                            [...new Array(x.countInStock).keys()].map((n) => (
                                                                                <option value={n + 1} key={n + 1} >{n + 1}</option>
                                                                            ))
                                                                        }

                                                                    </select>                                            
                                                                </div>
                                                                <p className="text-start text-md-center">
                                                                    <strong>${x.price}</strong>
                                                                </p>

                                                            </div>
                                                        </div>
                                                        <hr className="my-4" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4">
                                        <div className="card-header py-3">
                                            <h5 className="mb-0">Summary</h5>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                    Total Products
                                                    <span>{SummaryDetails.totalProducts}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                    Total Items
                                                    <span>{SummaryDetails.totalItems}</span>
                                                </li>
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                    <div>
                                                        <strong>Total Amount</strong>

                                                    </div>
                                                    <span><strong>${SummaryDetails.totalAmount}</strong></span>
                                                </li>

                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                    <div>
                                                        <strong>SubTotal</strong>

                                                    </div>
                                                    <span><strong>${SummaryDetails.totalAmount}</strong></span>
                                                </li>
                                            </ul>

                                            <button onClick={(CheckoutHandler)} type="button" className="btn btn-primary btn-lg btn-block text-dark" style={{ background: "#ffca2c" }}>
                                                Go to checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                }
            </section>
        </>
    )
}
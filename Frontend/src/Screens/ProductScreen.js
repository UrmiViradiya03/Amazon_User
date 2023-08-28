import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import apiHelper from "../Common/ApiHelper";
import Rating from "../Components/Rating";
import Loader from "../Components/Loading";



export default function ProductScreen  (props)  {
    const {setcartItems,cartItems}=props
    const { id } = useParams()
    const navigate=useNavigate()
    const [product, setProduct] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [count, setCounter] = useState(0)


    const Getproduct = async () => {
        try {
            setisLoading(true)
            const result = await apiHelper.fetchProductById(id)
            setProduct(result.data.Product)
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            console.log(error);
        }
    }


    useEffect(() => {
        Getproduct()
    })
    
    useEffect(()=>{
        setCounter(product.countInStock && product.countInStock> 0 ? 1:0)

    },[product])

    const AddToCart=()=>{
        const cart={
            product:id,
            count:count
        }
        const findIndex = cartItems.findIndex((x)=> x.product === id)
        if(findIndex > -1){
            cartItems[findIndex].count=cart.count
        }else{
            cartItems.push(cart)
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        setcartItems(cartItems)

        navigate("/cart")
    };

    return (
        <div className="container owerflow-hidden  " style={{ position: "relative" }} >
            <Loader isLoading={isLoading} />
            <div className="row mt-4 d-flex flex-wrapw" >
                <div className="col">
                    <img src={product.image} style={{ width: "350px" }} alt=""></img>
                </div>
                <div className="col">
                    <h6 className="link">Adidas fit shirt</h6>
                    <div
                        className="d-flex gap-1 align-items-center">
                        <Rating rating={product.rating} />
                        <span>
                            {product.numReviews} reviews
                        </span>
                    </div>

                    <div className="d-flex  pt-1">
                        <h4 className="fs-6 ">Price :</h4>
                        <span className="fs-6">${product.price}</span>
                    </div>
                    <div><h5 className="fs-6 mb-0">Description:</h5>
                        <span className="" style={{ fontSize: ".899rem" }}> {product.description}high quality product</span></div>
                </div>
                <div className="col">
                    <div className="box border border-1 w-100 bg-light px-2 py-3">
                        <ul className=" list-unstyled mb-0">
                            <li className="d-flex justify-content-between">
                                <h5 className="fs-6">Price</h5>
                                <span className="fs-6">${product.price}</span>
                            </li>

                            <li className="d-flex justify-content-between">
                                <h5 className="fs-6">Quentity</h5>
                                <span className="fs-6 g-2">
                                    <button disabled={product.countInStock <= 0 || count >= product.countInStock} 
                                    onClick={() => setCounter(product.countInStock > count ? count + 1 : count)}>+</button>&nbsp;&nbsp;

                                    <button>{count}</button>&nbsp;&nbsp;

                                    <button disabled={count <= 0} onClick={() => setCounter(count > 0 ? count - 1 : count)}>-</button></span>

                            </li>

                            <li className="d-flex justify-content-between">
                                <h5 className="fs-6">Status</h5>
                                {product.countInStock > 0 ? (

                                    <span className="fs-6 success" style={{ color: '#20a020' }}>In stock</span>
                                ) : (
                                    <span className="fs-6 error" style={{ color: '#a02020' }}>Unavailable</span>

                                )}
                            </li>
                        </ul>
                        <button disabled={count <= 0} onClick={AddToCart} className="btn btn-warning w-100 mt-2" type="button">Add to cart</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

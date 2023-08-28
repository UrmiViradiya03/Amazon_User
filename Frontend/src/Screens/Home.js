import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import apiHelper from "../Common/ApiHelper";
import Loader from "../Components/Loading";
import MessageBox from "../Components/MessageBox";

const Home = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")

    const FetchProducts = async () => {
        try {
            setisLoading(true)
            const result = await apiHelper.fetchProduct()

            if (result.status === 200) {
                setProducts(result.data.Product)
                setisLoading(false)
            }
        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.data.message) {
                return setError(error.response.data.message)
            }
            setError(error.message)
        }
    }

    useEffect(() => {

        FetchProducts()
        return () => {

        }
    }, [])

    return (
        <>
            <div className="container" style={{ position: "relative" }}>
                <MessageBox error={error} seterror={setError} />
                <Loader isLoading={isLoading} />
               
                <h5 className="mb-4">Feture Products.</h5>
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                    {products && products.map((x) => {
                        return <ProductCard key={x._id} product={x} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Home
import { Link } from "react-router-dom"
import Rating from "./Rating"

export default function ProductCard(props) {
    const {product} = props


    return (
        <div className="card" style={{ width: "18rem" }}>
        
            <img src={product.image} className="card-img-top" alt="..." />
            <div className="card-body" style={{ background: "#e8eff4" }}>
                <Link to={`/product/${product._id}`} className="d-block mb-3">
                    <h6 className="link">{product.name}</h6>
                </Link>
                <div className="d-flex gap-1 align-items-center">
                    <Rating rating={product.rating}/>
                    <span>
                        {product.numReviews} reviews
                    </span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <h5 className="fw-normal" style={{ color: "black" }}>${product.price}</h5>
                    <span className="link">{product.brand}</span>
                </div>
            </div>
        </div>
    )
}
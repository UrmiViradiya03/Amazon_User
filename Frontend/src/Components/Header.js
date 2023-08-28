
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function Header(props) {

    const {cartItems,setcartItems} = props

    const navigate = useNavigate()
    const {token,setToken}=props
    const {userInfo,setUserInfo}=props
     

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
        setUserInfo(localStorage.getItem("userInfo"))
    },[setToken, setUserInfo , navigate])

    useEffect(()=>{
        setcartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"))
        

    },[])
    
    return (
        <div className="py-2 bg-dark d-flex justify-content-between px-3 header" style={{ zIndex: "10000000" }}>
            <div className="logo text-light">
                <Link to={"/"}>
                    <h3 className="fw-bold text-light">Amazon</h3>
                </Link>
            </div>
            <div className="icons d-flex align-items-center gap-3">
                <i style={{ fontSize: "1.2rem" }} className="fa-solid fa-cart-shopping text-light position-relative fs-4" onClick={() => navigate("/cart")}>
                    <span style={{fontSize:"0.7rem"}} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItems.length}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </i>
                <button className="btn btn-warning" onClick={!token && !userInfo ? () => navigate("/login") : () => {
                    localStorage.removeItem("userInfo")
                    setUserInfo(localStorage.getItem("userInfo"))
                    localStorage.removeItem("token")
                    setToken(localStorage.getItem("token"))
                    navigate("/")
                }}>{!token && !userInfo ? "signIn" :"signOut"}</button>
            </div>
        </div>
    )
}
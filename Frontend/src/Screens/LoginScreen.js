import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Components/Loading";
import CheckoutSteps from "../Components/CheckoutSteps";
import Input from "../Components/Input";
import validation from "../Common/Validater";
import apiHelper from "../Common/ApiHelper";
import MessageBox from "../Components/MessageBox";


export default function LoginScreen(props) {
    const {setToken}=props
    const {setUserInfo}=props
    const [error, seterror] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [isSubmted, setisSubmted] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const [LoginError, setLoginError] = useState([])
    const [user, setuser] = useState({
        email: "",
        password: ""
    })
    const redirect = location.search.split("?redirect=")[1]
    
    const token = localStorage.getItem("token")
    const userInfo = localStorage.getItem("userInfo")
    useEffect(()=>{
        if(token && userInfo){
            navigate("/")
            return
        }
    },[]);

    console.log(LoginError)

    const LoginHandler = async () => {
        try {
            setisSubmted(true)

            const ValidationResult = validation(user, "login")
            if (ValidationResult.length > 0) {
                setLoginError(ValidationResult)
                return
            }
            setisLoading(true)
            const result = await apiHelper.userLogin(user)
            localStorage.setItem("userInfo", JSON.stringify(result.data.user));
            setToken(token)
            setUserInfo(userInfo)
            localStorage.setItem("token", JSON.stringify(result.data.user.token));
            setisLoading(false)

            if (redirect) {
                navigate("/shipping?redirect=payment")
                return
            }
            navigate("/")
            return

        } catch (error) {
            console.log(error)
            setisLoading(false)
            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data && error.response.data.message === "validation Error") {
                    setLoginError(error.response.data.validationResult)
                    return
                }
                seterror(error.response.data.message)
            } else {
                seterror(error.response)
            }
        }
    }

    return (
        <div className="container pt-4">
            {
                redirect && <CheckoutSteps signin={true} />
            }

            <div className="d-flex login justify-content-center align-item-center pt-5" style={{ position: "relative" }}>
                <Loader isLoading={isLoading} />
                <MessageBox error={error} seterror={seterror} />

                <div className="card shadow-lg" style={{ width: "25rem" }}>
                    <div className="px-4 py-2">
                        <h5 className="mb-0">Login</h5>
                    </div>
                    <div className="card-body bg-light">
                        <div className="row">
                            <div className="col-12 mb-2">
                                <Input
                                    type="text" placeholder="Email"
                                    onChange={(e) => {
                                        setuser({ ...user, email: e.target.value })
                                        if (isSubmted) {
                                            const ValidationResult = validation({...user , email:e.target.value}, "login")
                                            setLoginError(ValidationResult)
                                        }
                                    }}
                                    value={user.email}
                                isError={LoginError.find((x)=>x.key === "email") ? true:false}
                                helperText={LoginError.find((x)=>x.key === "email")?.message}
                                />

                               
                            </div>
                            <div className="col-12 mb-2">
                                <Input type="password" value={user.password} placeholder="Password"
                                    onChange={(e) => {
                                        setuser({ ...user, password: e.target.value })
                                        if (isSubmted) {
                                            const ValidationResult = validation({...user,password:e.target.value}, "login")
                                            setLoginError(ValidationResult)
                                        } 
                                    }}
                                     
                                      isError={LoginError.find((x)=> x.key === "password") ? true:false}
                                      helperText={LoginError.find((x)=>x.key === "password")?.message}
                                    />

                            </div>
                            <div className="col-12 mb-2">
                                <center>
                                    <button className="btn w-100 btn-warning" onClick={LoginHandler}>Singin</button>
                                    <span>or</span>
                                    <br />
                                    <Link className="link" to={!redirect ? "/register" : `/register${location.search}`}>
                                        <span>Create an Account</span>
                                    </Link>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { useState } from "react"
import apiHelper from "../Common/ApiHelper"
import { useLocation, useNavigate } from "react-router-dom"
import Loader from "../Components/Loading"
import validation from "../Common/Validater"
import MessageBox from "../Components/MessageBox"
import Input from "../Components/Input"

export default function RegisterUser() {
    const [error, seterror] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [isSubmted, setisSubmted] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search.split("?redirect=")[1]

    const [RegisterError, setRegisterError] = useState([])
    const [user, setuser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        conformPassword: ""
    })
    
    const RegisterHandler = async () => {
        try {
            setisSubmted(true)

            const validationResult = validation(user, "register")
            if (validationResult.length > 0) {

                setRegisterError(validationResult)
                return
            }

            setisLoading(true)
            const result = await apiHelper.RegistrationUser(user)
            console.log(result)
            console.log(result.data.user)
            setisLoading(false)

            localStorage.setItem("userInfo", JSON.stringify(result.data.user));
            localStorage.setItem("token", JSON.stringify(result.data.user.token));

            if (redirect) {
                navigate("/shipping?redirect=payment")
                return
            }
            navigate("/")
            return

        } catch (error) {
            setisLoading(false)
            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data && error.response.data.message === "validation Error") {
                    setRegisterError(error.response.data.validationResult)
                    return
                }
                seterror(error.response.data.message)
            } else {
                seterror(error.response)
            }
        }
    }

  
    return (
        <>
            {/* user register */}
            <section className="vh-100" style={{ background: "#eee;" }}>


                <div className="container h-100" >
                    <Loader isLoading={isLoading} />
                    <MessageBox error={error} seterror={seterror} />

                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ border: "none" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ marginTop: "-80px" }}>

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Create Account</p>

                                            <form className="mx-1 mx-md-4 " style={{ marginTop: "-30px" }}>


                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Input
                                                            type="text"
                                                            onChange={(e) => {
                                                                setuser({ ...user, firstName: e.target.value })
                                                                if (isSubmted) {
                                                                    const validationResult = validation({ ...user, firstName: e.target.value }, "register")
                                                                    setRegisterError(validationResult)

                                                                }
                                                            }} placeholder="First Name"
                                                            value={user.firstName}
                                                            isError={RegisterError.find((x) => x.key === "firstName") ? true : false}
                                                            helperText={RegisterError.find((x) => x.key === "firstName")?.message} />
                                                       
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Input
                                                            type="text"
                                                            onChange={(e) => {
                                                                setuser({ ...user, lastName: e.target.value })
                                                                if (isSubmted) {
                                                                    const validationResult = validation({ ...user, lastName: e.target.value }, "register")
                                                                    setRegisterError(validationResult)

                                                                }
                                                            }} placeholder="Last Name"
                                                            value={user.lastName}
                                                            isError={RegisterError.find((x) => x.key === "lastName") ? true : false}
                                                            helperText={RegisterError.find((x) => x.key === "lastName")?.message} />

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Input
                                                            type="text"
                                                            onChange={(e) => {
                                                                setuser({ ...user, email: e.target.value })
                                                                if (isSubmted) {
                                                                    const validationResult = validation({ ...user, email: e.target.value }, "register")
                                                                    setRegisterError(validationResult)

                                                                }
                                                            }} placeholder="Email"
                                                            value={user.email}
                                                            isError={RegisterError.find((x) => x.key === "email") ? true : false}
                                                            helperText={RegisterError.find((x) => x.key === "email")?.message} />
                                                        
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Input
                                                            type="password" placeholder="Password" onChange={(e) => {
                                                                setuser({ ...user, password: e.target.value })
                                                                if (isSubmted) {
                                                                    const validationResult = validation({ ...user, password: e.target.value }, "register")
                                                                    setRegisterError(validationResult)
                                                                }
                                                            }} value={user.password} isError={RegisterError.find((x) => x.key === "password") ? true : false}
                                                            helperText={RegisterError.find((x) => x.key === "password")?.message} />
                                                        
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Input
                                                            type="Password" placeholder="Conform Password" onChange={(e) => {
                                                                setuser({ ...user, conformPassword: e.target.value })
                                                                if (isSubmted) {
                                                                    const validationResult = validation({ ...user, conformPassword: e.target.value }, "register")
                                                                    setRegisterError(validationResult)
                                                                }
                                                            }} value={user.conformPassword}
                                                            isError={RegisterError.find((x) => x.key === "conformPassword") ? true : false}
                                                            helperText={RegisterError.find((x) => x.key === "conformPassword")?.message} />
                                                        
                                                    </div>
                                                </div>

                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                    <label className="form-check-label" for="form2Example3">
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-lg" onClick={RegisterHandler}>Register</button>
                                                </div>

                                            </form>

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
}
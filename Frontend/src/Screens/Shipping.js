import { useState } from "react";
import CheckoutSteps from "../Components/CheckoutSteps";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Components/Loading";
import MessageBox from "../Components/MessageBox";
import Input from "../Components/Input";
import validation from "../Common/Validater";


export default function Shipping() {
  const [user, setuser] = useState({
    fullName: "",
    Address: "",
    stete: "",
    city: "",
    pincode: "",
    phone: "",
    email: ""
  })
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState("")
  const [isSubmted, setisSubmted] = useState(false);
  const [ShippingError, setShippingError] = useState([]);
  const location = useLocation();
  const redirect = location.search.split("?redirect=")[1]

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")

  const ShippingHandler = async () => {

    try {
      setisSubmted(true)


      const validationResult = validation(user, "shipping")
      if (validationResult.length > 0) {

        setShippingError(validationResult)
        return
      }

      setisLoading(true)

      userInfo.user = user


      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setisLoading(false)

      if (!redirect) {
        navigate("/")
      } else {
        navigate("/payment?redirect=placeorder")
      }


    } catch (error) {
      setisLoading(false)
      if (error.response && error.response.data) {
        if (error.response.status === 400 && error.response.data && error.response.data.message === "validation Error") {
          setShippingError(error.response.data.validationResult)
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
      <div class="container py-5">
        <CheckoutSteps signin={true} shipping={true} />
        <Loader isLoading={isLoading} />
        <MessageBox error={error} seterror={seterror} />
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col">
            <div class="card my-4 shadow-3">
              <div class="row g-0">
                <div class="col-xl d-xl-block bg-image">

                </div>
                <div class="col-xl-12">
                  <div class="card-body p-md-5 text-black">
                    <h3 class="mb-4 text-uppercase">Delivery Info</h3>

                    <div class="row">

                      <div class="col-md-6 mb-4">
                        <div class="form-outline">
                          <Input
                            type="text" id="form3Example1n" class="form-control form-control-lg"

                            onChange={(e) => {

                              setuser({ ...user, fullName: e.target.value })
                              if (isSubmted) {
                                const validationResult = validation({ ...user, fullName: e.target.value }, "shipping")
                                setShippingError(validationResult)
                              }

                            }}

                            value={user.fullName}
                            isError={ShippingError.find((x) => x.key === "fullName") ? true : false}
                            helperText={ShippingError.find((x) => x.key === "fullName")?.message}
                          />

                          <label class="form-label" >fullName</label>
                        </div>
                      </div>
                    </div>

                    <div class="form-outline mb-4">
                      <Input type="text" id="form3Example8" class="form-control form-control-lg"
                        onChange={(e) => {

                          setuser({ ...user, Address: e.target.value })
                          if (isSubmted) {
                            const validationResult = validation({ ...user, Address: e.target.value }, "shipping")
                            setShippingError(validationResult)
                          }

                        }}

                        value={user.Address}
                        isError={ShippingError.find((x) => x.key === "Address") ? true : false}
                        helperText={ShippingError.find((x) => x.key === "Address")?.message}
                      />
                      <label class="form-label">Address</label>
                    </div>



                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <Input type="text" id="form3Example3" class="form-control form-control-lg" required
                          onChange={(e) => {

                            setuser({ ...user, stete: e.target.value })
                            if (isSubmted) {
                              const validationResult = validation({ ...user, stete: e.target.value }, "shipping")
                              setShippingError(validationResult)
                            }

                          }}

                          value={user.stete}
                          isError={ShippingError.find((x) => x.key === "stete") ? true : false}
                          helperText={ShippingError.find((x) => x.key === "stete")?.message}
                        />
                        <label class="form-label">stete</label>
                      </div>
                      <div class="col-md-6 mb-4">

                        <select class="select" onChange={(e) => setuser({ ...user, city: e.target.value })}>
                          <option value="1">City</option>
                          <option value="2">Option 1</option>
                          <option value="3">Option 2</option>
                          <option value="4">Option 3</option>
                        </select>

                      </div>
                    </div>

                    <div class="form-outline mb-4">
                      <Input type="text" id="form3Example3" class="form-control form-control-lg" required
                        onChange={(e) => {

                          setuser({ ...user, pincode: e.target.value })
                          if (isSubmted) {
                            const validationResult = validation({ ...user, pincode: e.target.value }, "shipping")
                            setShippingError(validationResult)
                          }

                        }}

                        value={user.pincode}
                        isError={ShippingError.find((x) => x.key === "pincode") ? true : false}
                        helperText={ShippingError.find((x) => x.key === "pincode")?.message}
                      />
                      <label class="form-label" >Zip</label>
                    </div>

                    <div class="form-outline mb-4">
                      <Input type="text" id="form3Example3" class="form-control form-control-lg" required
                        onChange={(e) => {

                          setuser({ ...user, phone: e.target.value })
                          if (isSubmted) {
                            const validationResult = validation({ ...user, phone: e.target.value }, "shipping")
                            setShippingError(validationResult)
                          }

                        }}

                        value={user.phone}
                        isError={ShippingError.find((x) => x.key === "phone") ? true : false}
                        helperText={ShippingError.find((x) => x.key === "phone")?.message}
                      />
                      <label class="form-label">Phone</label>
                    </div>

                    <div class="form-outline mb-4">
                      <Input type="text" id="form3Example3" class="form-control form-control-lg" required
                        onChange={(e) => {

                          setuser({ ...user, email: e.target.value })
                          if (isSubmted) {
                            const validationResult = validation({ ...user, email: e.target.value }, "shipping")
                            setShippingError(validationResult)
                          }

                        }}

                        value={user.email}
                        isError={ShippingError.find((x) => x.key === "email") ? true : false}
                        helperText={ShippingError.find((x) => x.key === "email")?.message}
                      />
                      <label class="form-label">email</label>
                    </div>

                    <div class="d-flex justify-content-end pt-3">
                      <button type="button" onClick={ShippingHandler} class="btn btn-success btn-lg ms-2"
                        style={{ backgroundcolor: "hsl(210, 100%, 50%) " }}>Place order</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
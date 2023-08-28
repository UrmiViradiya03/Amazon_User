export default function CheckoutSteps(props){
    const {signin,shipping,payment,placeorder}=props
    return(
        <div className="row m-0">
            <div className="col-3" style={{paddingTop:"5px", borderTop: signin ? "3px solid #ff8000":"3px solid gray"}}>
                <h5 style={{color: signin ?  "#ff8000" :"grey"}}>Signin</h5>
            </div>
            <div className="col-3" style={{paddingTop:"5px", borderTop: shipping ? "3px solid #ff8000":"3px solid gray"}}>
                <h5 style={{color: shipping ?  "#ff8000" :"grey"}}>Shipping</h5>
            </div>
            <div className="col-3" style={{paddingTop:"5px", borderTop: payment ? "3px solid #ff8000":"3px solid gray"}}>
                <h5 style={{color: payment ?  "#ff8000" :"grey"}}>Payment</h5>
            </div>
            <div className="col-3" style={{paddingTop:"5px", borderTop: placeorder ? "3px solid #ff8000":"3px solid gray"}}>
                <h5 style={{color: placeorder ? "#ff8000" :"grey"}}>Place Order</h5>
            </div>
        </div>
    )
}
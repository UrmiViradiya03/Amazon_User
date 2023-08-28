export default function Loader(props) {
    const { isLoading } = props
    if (isLoading) {

    return (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ width: "100%", position: "fixed", top: "0", left: "0", height: "100vh", background: "#fff", zIndex: "1000" }}>

            <i style={{ fontSize: "4rem" }} className="text-warning fa-solid fa-circle-notch fa-spin"></i>
            <br/>
            <h5>Loading...</h5>
        </div>

    )
}
    return "";
}
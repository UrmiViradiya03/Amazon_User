import { useState } from "react"

export default function MessageBox(props) {
    const {error,seterror}=props

    return (
        <>
            
            <div className={error ? "d-block":"d-none"}>
                <div className={`modal fade ${error ? "show": ''}`} style={{display:error ? "block":"",  marginTop: "28px",height:"250px"}}  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Error</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              {error}
                            </div>
                            <div className="modal-footer">
                                <button onClick={()=>seterror("")} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={()=>seterror("")} style={{position:"fixed",transition:"all 0.3s ease-in-out",top:"0",left:"0",background:"black",zIndex:"1000",opacity:"0.5",minHeight:"100vh",minWidth:"100%"}}></div>
            </div>

        </>
    )
}
export default function validation(data,type){
    let err=[]

    if(type==="register"){
        if(!(data.firstName)){
            err.push({key:"firstName",message:"reuired feild Firstname is empty"})
        }else if(!(/^[a-zA-Z ]{2,30}$/.test(data.firstName))){
            err.push({key:"firstName",message:"Firstname is invalid"})
        }
        if(!(data.lastName)){
            err.push({key:"lastName",message:"reuired feild Lastname is empty"})
        }else if(!(/^[a-zA-Z ]{2,30}$/.test(data.lastName))){
            err.push({key:"lastName",message:"Lastname is invalid"})
        }
        if(!(data.email)){
            err.push({key:"email",message:"reuired feild Email is empty"})
        }else if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))){
            err.push({key:"email",message:"Email is invalid"})
        }
        
        if(!(data.password)){
            err.push({key:"password",message:"reuired feild Password is empty"})
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
            err.push({key:"password",message:"password to week please strong password"})
            
        }
    }else if (type === "adminUser") {
        if (!(data.fullName)) {
            err.push({ key: "fullName", message: "Required felid FullName is Empty" })
        } else if (!(/^[a-zA-Z ]{2,30}$/.test(data.firstName))) {
            err.push({ key: "fullName", message: "FullName is invaild." })
        }

        if (!(data.email)) {
            err.push({ key: "email", message: "Required felid Email is Empty" })
        }
        else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))) {
            err.push({ key: "email", message: "Email is invaild." })
        }
        if (!(data.password)) {
            err.push({ key: "password", message: "Required felid Password is Empty" })
        } else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
            err.push({ key: "password", message: "Password to week please strong password" })
        }
    }
    else{
        if(!(data.email)){
            err.push({key:"email",message:"reuired feild Email is empty"})
        }else if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))){
            err.push({key:"email",message:"Email is invalid"})
        }
        
        if(!(data.password)){
            err.push({key:"password",message:"reuired feild Password is empty"})
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
            err.push({key:"password",message:"password must be minimum eight characters"})
        }
    }
    return err
}

export default function validation(data, type) {
    let err = []

    if (type === "register") {
        if (!(data.firstName)) {
            err.push({ key: "firstName", message: "reuired feild Firstname is empty" })
        } else if (!(/^[a-zA-Z ]{2,30}$/.test(data.firstName))) {
            err.push({ key: "firstName", message: "Firstname is invalid" })
        }

        if (!(data.lastName)) {
            err.push({ key: "lastName", message: "reuired feild Lastname is empty" })
        } else if (!(/^[a-zA-Z ]{2,30}$/.test(data.lastName))) {
            err.push({ key: "lastName", message: "Lastname is invalid" })
        }
        if (!(data.email)) {
            err.push({ key: "email", message: "reuired feild Email is empty" })
        } else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))) {
            err.push({ key: "email", message: "Email is invalid" })
        }

        if (!(data.password)) {
            err.push({ key: "password", message: "reuired feild Password is empty" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
            err.push({ key: "password", message: "password to week please strong password" })

        }
        if (!(data.conformPassword)) {
            err.push({ key: "conformPassword", message: "reuired feild conformpassword is empty" });
        }
        else if (!(data.conformPassword === data.password)) {
            err.push({ key: "conformPassword", message: "not match password" });

        }
    }

    else if (type === "shipping") {

        if (!(data.fullName)) {
            err.push({ key: "fullName", message: "reuired feild Fullname is empty" })
        } else if (!(/^[a-zA-Z ]{2,30}$/.test(data.fullName))) {
            err.push({ key: "fullName", message: "Fullname is invalid" })
        }

        if (!(data.Address)) {
            err.push({ key: "Address", message: "reuired feild Address is empty" })
        } else if (!(/[A-Za-z'\.\-\s\,]{5,}$/.test(data.Address))) {
            err.push({ key: "Address", message: "Address is invalid" })
        }

        if (!(data.stete)) {
            err.push({ key: "stete", message: "reuired feild stete is empty" })
        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(data.stete))) {
            err.push({ key: "stete", message: "stete is invalid" })
        }

        if (!(data.pincode)) {
            err.push({ key: "pincode", message: "reuired feild Pincode is empty" })
        } else if (!(/^(\d{4}|\d{6})$/.test(data.pincode))) {
            err.push({ key: "pincode", message: "Pincode is invalid" })
        }

        if (!(data.phone)) {
            err.push({ key: "phone", message: "reuired feild Phone is empty" })
        } else if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(data.phone))) {
            err.push({ key: "phone", message: "Phone is invalid" })
        }

        if (!(data.email)) {
            err.push({ key: "email", message: "reuired feild Email is empty" })
        } else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))) {
            err.push({ key: "email", message: "Email is invalid" })
        }

    }

    else {
        if (!(data.email)) {
            err.push({ key: "email", message: "reuired feild Email is empty" })
        } else if (!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(data.email))) {
            err.push({ key: "email", message: "Email is invalid" })
        }

        if (!(data.password)) {
            err.push({ key: "password", message: "reuired feild Password is empty" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
            err.push({ key: "password", message: "password must be minimum eight characters" })

        }
    }
    return err
}

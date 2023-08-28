import axios from "axios"


class ApiHelper {


    constructor() {
        this.baseUrl = 'http://localhost:5000'
        this.token = JSON.parse(localStorage.getItem("token"))
    }

    fetchProduct() {
        return axios.get(this.baseUrl + '/product')
    }
    fetchProductById(id) {
        return axios.get(this.baseUrl + '/product/' + id)
    }
    userLogin(data) {
        return axios.post(this.baseUrl + '/user/login', data)
    }
    RegistrationUser(data) {
        return axios.post(this.baseUrl + '/user/register', data)
    }
    fetchCart(products) {
        return axios.post(`${this.baseUrl}/cart`, { products: products })
    }
    placeorder(order) {
        return axios.post(`${this.baseUrl}/orderauth`, order, { headers: { token: this.token } })
    }
    paymentVerify(details) {
        return axios.post(`${this.baseUrl}/payment/verify`, details, { headers: { token: this.token } })
    }
}


const apiHelper = new ApiHelper()
export default apiHelper
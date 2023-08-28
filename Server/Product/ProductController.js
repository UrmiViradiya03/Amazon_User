import productmodal from "./ProductModal.js"

// const products = [
//   {
//     name: 'Slim Shirt',
//     category: 'Shirts',
//     image: '/images/d1.jpg',
//     alias:'sllim_shirt',
//     price: 60,
//     brand: ' Nike',
//     rating: 4.5,
//     numReviews: 10
//   },
//   {
    
//     name: 'Fit Shirt',
//     category: 'Shirts',
//     image: '/images/d2.jpg',
//     alias:'fit_shirt',
//     price: 50,
//     brand: ' Nike',
//     rating: 3.2,
//     numReviews: 5
//   },
//   {
  
//     name: 'Best Pants',
//     category: 'Pants',
//     image: '/images/d3.jpg',
//     alias:'best_shirt',
//     price: 70,
//     brand: ' Nike',
//     rating: 2.5,
//     numReviews: 8
//   }, {
 
//     name: 'west Pants',
//     category: 'Pants',
//     image: '/images/p1.jpg',
//     alias:'west_shirt',
//     price: 70,
//     brand: ' Nike',
//     rating: 4.5,
//     numReviews: 8
//   },
// ]

class ProductController {

  async insertMany(req,res){

    try {
      const result=await productmodal.insertMany(products)
          if(result){

            return res.status(200).send({message:"sucess", products:result})
          }
          return res.status(500).send({message:"Something went wrong"})
    } catch (error) {
      console.log(error);
      return res.status(500).send({message:"internal server error"})
      
    }
  }

  async getProduct(req,res){

    try {
      const result=await productmodal.find({})
          if(result){
            return res.status(200).send({message:"sucess", Product:result})
          }
          return res.status(500).send({message:"Something went wrong"})
    } catch (error) {
      console.log(error);
      return res.status(500).send({message:"internal server error"})
      
    }
  }

  getProductByID(req, res) {
    const { id } = req.params

    if (!id) {
      return res.status(400).send({ message: 'Bad Request' })
    }

    const product = products.find((product) => product._id === id)

    if (!product) {
      return res.status(200).send({ message: 'Not Found', product: product || {} })
    }
    return res.status(200).send({ message: 'success', product: product || {} })


  }


 async getProductByID(req,res){
    try {
      const {id} = req.params
      if(!id){
        return res.status(400).send({message:"Bad request"})
      }
      const result=await productmodal.findById({_id:id})
      if(result){
        return res.status(200).send({ message: "sucess", Product:result})

      }
      return res.status(500).send({ message: 'something went wrong'})
 
    } catch(error)  {
      return res.status(500).send({message:"internal server error"})
    }
  }



  async Getcart(req,res){
    try {
      const {products}=req.body
      console.log(products);
      if(!products){
        return res.status(400).send({message:"Missing dependencies products"})
      }
      const result=await productmodal.find({_id:products}).select(["name","price","_id","category","brand","countInStock","image"])
      if(!products){
        return res.status(500).send({message:"something went wrong"})
      }
      return res.status(200).send({message:"success",products:result})
    } catch (error) {
      return res.status(500).send({message:"internal server error"})
    }
  }

}

const productController = new ProductController()
export default productController
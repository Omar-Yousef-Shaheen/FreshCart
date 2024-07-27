import axios from "axios"
import { useQuery } from "react-query"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import Slider from "react-slick";
import { useContext } from "react";
import Loading from "../Loading/Loading";
import { cartContext } from "../../Context/CartContext";
import Product from "../Products/Products";
export default function ProductDetiels() {
  // *CartContext 
  const { postProductToCart} = useContext(cartContext)
   const nav =   useNavigate()
  


  // ^ Slider
  var settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

// *UseParams form react-router-dom
 let {id} = useParams()

//  !Query to call Api 
 function getProductDetails(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 }
  const {data , isLoading , isError} = useQuery(`GetProductDetials-${id}` , getProductDetails)

  if (isLoading) {
    return <Loading/>
  }

  if (isError) {
    return <Navigate to='/products'/>
  }
  const productDetails = data.data.data
  return (
    <div className="container">
      <div className="mt-2">
        <button onClick={()=>{nav("/products")}} className="btn bg-main text-white fw-semibold">Back</button>
      </div>
      <div className="row align-items-center">
        <div className="col-md-4">
          <div className="border border-1 border-dark-subtle rounded-3 my-5 py-3">
          <Slider {...settings}>
                {productDetails.images.map((image) => (
                  <img
                    className="w-100"
                    src={image}
                    key={productDetails.id}
                    alt={productDetails.title}
                  />
                ))}
              </Slider>
          </div>
        </div>
        <div className="col-md-8">
            <div className="productInfo">
            <h1 className="fw-semibold h3 text-main text-center mb-5">
                {productDetails.category.name}
              </h1>
              <p className="fw-semibold text-muted ">-{productDetails.title}</p>
              <p className="fw-bolder fs-6 text-center">{productDetails.description}</p>
              <div className="price mt-2 d-flex justify-content-between align-items-center fw-bold">
                  
                  {productDetails.priceAfterDiscount ? (
                  <p className="fw-bolder">
                    <span className="text-decoration-line-through opacity-50">
                      {productDetails.price} 
                    </span>{" "}
                    - {productDetails.priceAfterDiscount} EGP 
                  </p>
                ) : (
                  <p>{productDetails.price} EGP</p>
                )}
                <span className="fw-semibold">
                  <i
                    style={{ color: "yellow" }}
                    className="fa-solid fa-star me-1"
                  ></i>
                  {productDetails.ratingsAverage}
                </span>
              </div>
            </div>
            <button
              onClick={()=>{postProductToCart (productDetails.id)}}
              className="mt-3 btn bg-main w-100 text-white fw-semibold"
            >
              Add to cart 
            </button>
          </div>
      </div>
    </div>
  )
}

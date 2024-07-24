import axios from "axios";
import { useQuery } from "react-query";
import BannerOne from "../../images/grocery-banner-2.jpeg";
import BannerTwo from "../../images/grocery-banner.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CategorySlider from "../CategorySlider/CategorySlider";
import Loading from "../Loading/Loading";
import { cartContext } from "../../Context/CartContext";
import AutoPlay from "../HomeSlider/HomeSlider";

export default function Product() {
  // !CartContaxet
  const { postProductToCart } = useContext(cartContext);
  // const buttonChange = [
  //   { id: "6439d58a0049ad0b52b9003f", nameButton: "Women Fashion" },
  //   { id: "6439d5b90049ad0b52b90048", nameButton: "Men Fashion" },
  //   { id: "6439d2d167d9aa4ca970649f", nameButton: "Electronics" },
  // ];

  // const [data.data.data, setProducts] = useState(undefined);
  // async function getAllProducts() {
  // await axios
  // .get("https://ecommerce.routemisr.com/api/v1/products")
  // .then((result) => {
  //   console.log(result.data.data);
  //   setProducts(result.data.data);
  // })
  // .catch((error) => {
  //   console.log(error.data);
  // });
  // useEffect(() => {
  //   getAllProducts("6439d58a0049ad0b52b9003f");

  // }, []);

  //! React Query =>
  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isLoading } = useQuery("GetAllProduct", getAllProducts);

  // *Component Loading
  if (isLoading) {
    return <Loading />;
  }
  const allProducts = data.data.data;

  return (
    <div className="container">
      <div className="row g-0 flex-nowrap   my-5">
        <div className=" col-md-8">
          <AutoPlay />
        </div>
        <div className=" col-md-4">
          <div>
            <img
              style={{ height: "150px" }}
              className="w-100"
              src={BannerOne}
              alt="Imag-Banner"
            />
          </div>
          <div>
            <img
              style={{ height: "150px" }}
              className="w-100"
              src={BannerTwo}
              alt="Imag-Banner"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="fw-bold mb-4">Shop Popular Categories :</h3>
        <CategorySlider />
      </div>

      <div className="row g-4  mt-5  ">
        {allProducts.map((item, index) => (
          <div
            key={index}
            className="product col-md-3  p-3 rounded-3 bg-body-tertiary  "
          >
            <div className="">
              <Link to={`/productDetiels/${item.id}`}>
                <img className="w-100 mb-2" src={item.imageCover} alt="" />
                <h3 className="h6 fw-bolder text-main text-center ">
                  {item.category.name}
                </h3>
                <h2 className="h6 fw-bold text-center text-muted">
                  {item.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <div className="fw-semibold d-flex justify-content-between">
                  {item.priceAfterDiscount ? (
                    <p>
                      <span className="text-decoration-line-through opacity-50">
                        {item.price}
                      </span>
                      - {item.priceAfterDiscount} EGP
                    </p>
                  ) : (
                    <p>{item.price} EGP</p>
                  )}
                  <p>
                    <span>
                      <i
                        style={{ color: "yellow" }}
                        className="fa-solid fa-star"
                      ></i>
                    </span>
                    {item.ratingsAverage}
                  </p>
                </div>
              </Link>
            </div>
            <button
              onClick={() => {
                postProductToCart(item.id);
              }}
              className="btn bg-main w-75 text-white d-block m-auto"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

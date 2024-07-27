import { useContext } from "react";
import { Link } from "react-router-dom";
import EmtyCart from "../EmtyCart/EmtyCart";
import Loading from "../Loading/Loading";
import { cartContext } from "../../Context/CartContext";

export default function Cart() {
  let {
    allProducts,
    changeCountProduct,
    removeProduct,
    clearCart,
    totalCartPrice,
    isLoading,
  } = useContext(cartContext);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {allProducts.length > 0 ? (
        <div className="container  bg-main-light p-5">
          <div className="d-flex gap-2 justify-content-between align-items-center pt-5 flex-wrap">
            <div>
              <h2 className="fw-bold border-bottom border-3">Shop Cart:</h2>
              <h5 className="text-main fw-semibold">
                Total Cart Price : {totalCartPrice} EGP{" "}
              </h5>
              <Link to="/paymentCash">
                <button className="btn btn-outline-dark fw-bolder">
                  ConFirm Payment
                </button>
              </Link>
            </div>
            <button
              onClick={() => {
                clearCart();
              }}
              className="btn btn-outline-success "
            >
              Clear Cart
            </button>
          </div>
          {allProducts.map((product, index) => (
            <div
              key={index}
              className="row align-items-center  border-bottom border-2 pb-4 gap-2 my-4   "
            >

              <div className="col-md-4">
                <figure>
                  <img
                    className="w-100 "
                    src={product.product.imageCover}
                    alt={product.product.title}
                  />
                </figure>
              </div>

              <div className="col-md-6">
                <article >
                  <figure className="w-50">
                    <img
                      className="w-25"
                      src={product.product.brand.image}
                      alt={product.product.brand.name}
                    />
                  </figure>
                  <h5 className="fw-semibold text-muted">
                    {product.product.title}
                  </h5>
                  <h5 className="fw-bold py-2">price :{product.price}</h5>
                  <button
                    onClick={() => {
                      removeProduct(product.product.id);
                    }}
                    className="btn btn-outline-success mb-3"
                  >
                    <i className="fa-solid fa-trash-can me-2 "></i>
                    Remove
                  </button>
                  {/* <br />
                1:{product._id} <br />
                2:{product.product.id} */}
                </article>
              </div>

              <div className="col-md-4">
                <div className="d-flex justify-content-around align-items-center ">
                  <button
                    onClick={() => {
                      changeCountProduct(product.product.id, product.count + 1);
                    }}
                    className="btn btn-outline-success fw-bold fs-6 "
                  >
                    +
                  </button>
                  <span className="bg-opacity-50 bg-light px-3 py-2 rounded-5 fw-bold fs-5">{product.count}</span>
                  <button
                    disabled={product.count === 0}
                    onClick={() => {
                      changeCountProduct(product.product.id, product.count - 1);
                    }}
                    className="btn btn-outline-success fw-bold fs-6 "
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmtyCart />
      )}
    </>
  );
}

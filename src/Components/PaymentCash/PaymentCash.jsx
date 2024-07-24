import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import axiosInstance from "../../Services/Instance";
import { cartContext } from "../../Context/CartContext";


// const CustemInput = (type , id , onBlur , onChange , value )=> {
//  return <input
//  type={type}
//  id={id}
//  className="form-control myshadow border-bottom  border-0 mb-2"
//  onBlur={onBlur}
//  onChange={onChange}
//  value={value}
// />
// }

export default function PaymentCash() {
  const [paymentOnline, setPaymentOnline] = useState(false);
  const { cartID, clearCart } = useContext(cartContext);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    city: "",
    phone: "",
    details: "",
  };

  const validationSchema = Yup.object({
    city: Yup.string().required("Enter Your City"),
    phone: Yup.string().required("Enter Your Number Phone"),
    details: Yup.string().required("Enter Your Details"),
  });

  function onSubmit() {
    const shippingAddress = {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    };
    if (paymentOnline) {
      axiosInstance
      .post(
       `/orders/checkout-session/${cartID}` , shippingAddress , {
        // params : {url : import.meta.env.VITE_BASE_URL}
        params : {url : window.location.origin}
       }
      )
      .then((result) => {
        setSpinner(true);
        if (result.data.status === "success") {
          toast.success("Payment Completed successfully");
          clearCart()
          window.open(result.data.session.url  , '_self')
        }
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
          axiosInstance
      .post(`/orders/${cartID}`, shippingAddress)
      .then((result) => {
        setSpinner(true);
        if (result.data.status === "success") {
          clearCart();
          toast.success("Payment Completed successfully", { duration: 1000 });
          setTimeout(() => {
            navigate("/products");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }



  }
  const handleTogglePaymentOnline = () => setPaymentOnline((prev) => !prev);

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });

  return (
    <div className="container  w-50 m-auto my-5">
      <form onSubmit={handleSubmit}>
        <label className="fw-bolder text-muted mb-2 " htmlFor="city">
          City:
        </label>
        <input
          type="text"
          id="city"
          className="form-control myshadow border-bottom  border-0 mb-2"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.city}
        />

        {errors.city && touched.city ? (
          <div className="alert alert-link text-danger my-0 py-0 pb-2 ">
            {errors.city}
          </div>
        ) : (
          ""
        )}

        <label className="fw-bolder text-muted mb-2 " htmlFor="phone">
          Phone:
        </label>
        <input
          type="phone"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone}
          id="phone"
          className="form-control myshadow border-bottom  border-0 mb-2"
        />
        {errors.phone && touched.phone ? (
          <div className="alert alert-link text-danger my-0 py-0 pb-2 ">
            {errors.phone}
          </div>
        ) : (
          ""
        )}
        <label className="fw-bolder text-muted mb-2 " htmlFor="details">
          Details:
        </label>
        <textarea
          wrap="none"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.details}
          type="text"
          id="details"
          className="form-control myshadow border-bottom  border-0 mb-2"
        ></textarea>
        {errors.details && touched.details ? (
          <div className="alert alert-link text-danger my-0 py-0 pb-2 ">
            {errors.details}
          </div>
        ) : (
          ""
        )}

        <div className="d-flex align-items-center justify-content-between mt-4">
          <button type="submit" className="btn bg-main text-white fw-bolder">
            {spinner ? (
              <Circles
                height="30"
                width="40"
                color="#fff"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : paymentOnline ? (
              "Confirm Online"
            ) : (
              "Confirm Cash"
            )}
          </button>

          <span
            className=" fw-bold text-main cursor-pointer"
            onClick={handleTogglePaymentOnline}
          >
            {paymentOnline ? "Confirm Cash ...?" : " Confirm Online ..?"}
          </span>
        </div>
      </form>
    </div>
  );
}

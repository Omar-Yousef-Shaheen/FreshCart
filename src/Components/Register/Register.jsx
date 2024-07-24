import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Circles } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const [isSucces, setisSucces] = useState(false);
  const [isExites, setIsExites] = useState(undefined);
  const [spinner, setSpinner] = useState(false)
  let navigate = useNavigate();




  //^ Func To send data to BackEnd
  async function sendUserData(values) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((result) => {
        console.log("succes userData send to Back End", result.data);
        setisSucces(true);

        setTimeout(() => {
          setisSucces(false);
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        console.log(
          "error of userData send to Back End",
          error.response.data.message
        );
        setIsExites(error.response.data.message);
        setTimeout(() => {
          setIsExites(undefined)
        }, 2000);
      });
      setSpinner(false)
  }

  // ! Send To Formik_______________________________
  const userData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };

  function mySubmit(values) {
    console.log("Submited.....", values);
    setSpinner(true)
    sendUserData(values);
  }

  const mySchema = Yup.object({
    name: Yup.string()
      .required("Name must be required")
      .min("3", "at least 3 characters")
      .max(7, "at least 7 characters"),
    phone: Yup.string()
      .required("Number phone must be required")
      .matches(
        /^01[0125][0-9]{8}$/,
        "Your number phone must me Egyption number"
      ),
    email: Yup.string()
      .required("Email must be required")
      .email("Email not Valdite"),
    password: Yup.string()
      .required("Must be required")
      .min(6, "Password at Least 6 characters")
      .max(12, "Password at Least 12 characters"),
    rePassword: Yup.string()
      .required("Must be required")
      .oneOf([Yup.ref("password")], "Password and repassword dont match"),
  });
  // !_____________________________________________

  const myFormik = useFormik({
    initialValues: userData,

    onSubmit: mySubmit,

    validationSchema: mySchema,
  });

  return (
    <>
      <div className="w-75  m-auto  py-5">
        {isSucces ? (
          <div className="py-0 alert alert-link h4 text-success text-center ">
            Your Account has been created
          </div>
        ) : (
          ""
        )}
        {isExites ? (
          <div className="py-0 alert alert-link h4 text-danger text-center ">
            {isExites}
          </div>
        ) : (
          ""
        )}
        <h2 className="pb-4 text-main fw-bold">Register Now :</h2>

        <form onSubmit={myFormik.handleSubmit}>
          <label className="fw-bold text-muted mb-2" htmlFor="name">
            name:
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.name}
            type="text"
            
            id="name"
            className="form-control  myshadow border-bottom  border-0 mb-3"
          />
          {myFormik.errors.name && myFormik.touched.name ? (
            <div className="alert alert-link text-danger my-0  py-0 pb-2 ">
              {myFormik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label className="fw-bolder text-muted mb-2 " htmlFor="email">
            email:
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            type="email"
            
            id="email"
            className="form-control myshadow border-bottom  border-0 mb-3"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-link text-danger my-0 py-0 pb-2 ">
              {myFormik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label className="fw-bolder text-muted mb-2" htmlFor="phone">
            phone:
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.phone}
            type="text"
           
            id="phone"
            className="form-control myshadow border-bottom  border-0 mb-3"
          />
          {myFormik.errors.phone && myFormik.touched.phone ? (
            <div className="alert alert-link text-danger my-0 py-0 pb-2 ">
              {myFormik.errors.phone}
            </div>
          ) : (
            ""
          )}

          <label className="fw-bolder text-muted mb-2" htmlFor="password">
            password:
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            type="password"
            
            id="password"
            className="form-control myshadow border-bottom  border-0 mb-3"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-link text-danger my-0 py-0 pb-2 ">
              {myFormik.errors.password}
            </div>
          ) : (
            ""
          )}

          <label className="fw-bolder text-muted mb-2" htmlFor="rePassword">
            rePassword:
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.rePassword}
            type="password"
            
            id="rePassword"
            className="form-control myshadow border-bottom  border-0 mb-3"
          />
          {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
            <div className="alert alert-link text-danger my-0 py-0 pb-2 ">
              {myFormik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="btn  bg-main text-white  fw-bolder mt-2"
          >

            {spinner ? <Circles
              height="30"
              width="40"
              color="#fff"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              /> : "Register" } 
              
            
            
          </button>
          <Link
            className="m-3 text-main pb-1 fw-semibold border-bottom border-2  "
            to="/Login"
          >
            Login ?
          </Link>
        </form>
      </div>
    </>
  );
}

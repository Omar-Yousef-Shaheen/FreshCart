import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Circles } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authenContext } from "../../Context/AuthenContext";

export default function Login() {
  const [isSucces, setisSucces] = useState(false);
  const [isExites, setIsExites] = useState(undefined);
  const [spinner, setSpinner] = useState(false);
  let navigate = useNavigate();
  const { setToken } = useContext(authenContext);

  //^ Func To send data to BackEnd
  async function sendUserData(values) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((result) => {
        if (result.data.message == "success") {
          console.log("in Login succes userData send to Back End", result.data);
          console.log("in Login => Token ", result.data.token);
          localStorage.setItem("TokenUser", result.data.token);
          setToken(result.data.token);
          setisSucces(true);
          setTimeout(() => {
            navigate("/products");
            setisSucces(false);
          }, 3000);
        }
      })

      .catch((error) => {
        console.log(
          " in Login error of userData send to Back End",
          error.response.data.message
        );
        setIsExites(error.response.data.message);
        setTimeout(() => {
          setIsExites(undefined);
        }, 2000);
      });
    setSpinner(false);
  }

  // ! Send To Formik_______________________________
  const userData = {
    email: "",

    password: "",
  };

  function mySubmit(values) {
    console.log("Submited.....", values);
    setSpinner(true);
    sendUserData(values);
  }

  const mySchema = Yup.object({
    email: Yup.string()
      .required("Email must be required")
      .email("Email not Valdite"),
    password: Yup.string()
      .required("Must be required")
      .min(6, "Password at Least 6 characters")
      .max(12, "Password at Least 12 characters"),
  });
  // !_____________________________________________

  const myFormik = useFormik({
    initialValues: userData,

    onSubmit: mySubmit,

    validationSchema: mySchema,
  });

  return (
    <>
      <div className="w-75 m-auto py-5">
        {isSucces ? (
          <div className="py-0 alert alert-link h4 text-success text-center ">
            Welcome Back
          </div>
        ) : (
          ""
        )}
        {isExites ? (
          <div className="py-0 alert alert-link h4 text-danger text-center  ">
            {isExites}
          </div>
        ) : (
          ""
        )}

        <h2 className="pb-4 text-main fw-bold">Login :</h2>

        <form onSubmit={myFormik.handleSubmit}>
          <label className="fw-bolder text-muted mb-2 " htmlFor="email">
            email:
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            autoComplete="off"
            type="email"
            id="email"
            className="form-control myshadow border-bottom  border-0 mb-2"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-link text-danger my-0 py-0 ">
              {myFormik.errors.email}
            </div>
          ) : (
            ""
          )}

          <label className="fw-bolder text-muted mb-2 mt-4" htmlFor="password">
            password:
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            type="password"
            id="password"
            className="form-control myshadow border-bottom  border-0 mb-2"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-link text-danger my-0 py-0 pb-2  ">
              {myFormik.errors.password}
            </div>
          ) : (
            ""
          )}

          <div className="mt-4">
            <button
              type="submit"
              className="btn myshadow bg-main text-white  fw-bolder "
            >
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
              ) : (
                "Login"
              )}
            </button>
            <Link
              className="m-3  pb-1 fw-semibold border-bottom border-2 text-main  "
              to="/register"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

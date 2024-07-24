import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { useContext, useEffect, useRef } from "react";

import { authenContext } from "../../Context/AuthenContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { token, setToken, profileData } = useContext(authenContext);
  const { numOfCartItem } = useContext(cartContext);
  const navigate = useNavigate();
  const navRef = useRef();

  useEffect(() => {
    if (!navRef.current) return;
    const onScroll = () => {
      if (window.scrollY > 20) {
        navRef.current.style.background = "rgba(224, 224, 211, 0.767)";
      } else {
        navRef.current.style.background = "transparent";
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function signOut() {
    // Remove CartOwner
    localStorage.removeItem("cartOwner");
    // Remove LocalStorage
    localStorage.removeItem("TokenUser");
    // Remove Token In State and reRender => Edite Ux
    setToken(undefined);
    // NaviGate User
    navigate("/Login");
  }
  return (
    <>
      <nav
        ref={navRef}
        className="navbar  transition navbar-expand-lg py-3  position-sticky top-0 left-0 w-100 z-3 "
      >
        <div className="container-fluid fw-bold">
          <Link className="navbar-brand" to="/products">
            <img src={logo} alt="logo-image" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    // aria-current="page"
                    to="/products"
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link" to="/brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link" to="/allOrders">
                    All Orders
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="/cart">
                    Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                      {numOfCartItem ? numOfCartItem : ""}
                    </span>
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {token ? (
                <>
                  <li className="nav-item ">
                    <span className="nav-link fs-5 text-black ">
                      <span className="text-main">Hi, </span>
                      {profileData?.name}
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={signOut}
                      role="button"
                      className="nav-link text-main"
                    >
                      LogOut..?
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <ul className="list-unstyled d-flex">
                      <li>
                        <i className="me-3 fa-brands fa-instagram"></i>
                      </li>
                      <li>
                        <i className="me-3 fa-brands fa-facebook-f"></i>
                      </li>
                      <li>
                        <i className="me-3 fa-brands fa-linkedin"></i>
                      </li>
                      <li>
                        <i className="me-3 fa-brands fa-twitter"></i>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../Services/Instance";
import { authenContext } from "./AuthenContext";



export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token } = useContext(authenContext);
  const [allProducts, setAllProducts] = useState([]);
  const [numOfCartItem, setNumOfCartItem] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartID, setCartID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //* Function add Product To Cart
  async function addProductToCart(id) {
    const booleanFlag = await axiosInstance
      .post("/cart", {
        productId: id,
      })
      .then((result) => {
        console.log(result);
        cachedUserData();
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return booleanFlag;
  }

  //* Function Post Product To Cart And any Action
  async function postProductToCart(id) {
    const result = await addProductToCart(id);
    if (result) {
      toast.success("The product has been added successfully", {
        duration: 3000,
        className: " text-center , fw-bold ",
      });
    } else {
      toast.error("There is something wrong.", {
        duration: 3000,
        className: " text-center , fw-bold ",
      });
    }
  }

  // *Cached UserDara if User Login Again See it Data in Cart Component
  function cachedUserData() {
    setIsLoading(true);
    axiosInstance
      .get("/cart")
      .then((result) => {
        console.log("cached data", result.data);
        setAllProducts(result.data.data.products);
        setNumOfCartItem(result.data.data.products?.length);
        setTotalCartPrice(result.data.data.totalCartPrice);
        setCartID(result.data.data._id);
        localStorage.setItem("cartOwner", result.data.data.cartOwner);
      })
      .catch((error) => {
        console.log("Error cached Data user", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // * Cached Data in updating phase => rernder Context Component in state user Loginin
  useEffect(() => {
    if (token) cachedUserData();
  }, [token]);

  // *update Count
  async function updateCount(id, newCount) {
    const booleanFlag = await axiosInstance
      .put(`/cart/${id}`, {
        count: newCount,
      })
      .then((result) => {
        setTotalCartPrice(result.data.data.totalCartPrice);
        setAllProducts(result.data.data.products);
        setNumOfCartItem(result.data.data.products?.length);
        return true;
      })
      .catch((error) => {
        console.log("error UpdateCount", error);
        return false;
      });
    return booleanFlag;
  }

  //* Function Post Product To Cart And any Action
  async function changeCountProduct(id, newCount) {
    const booleanFlag = await updateCount(id, newCount);
    if (booleanFlag) {
      toast.success("Updated Success");
    } else {
      toast.error("Updated error try again");
    }
  }
  // *Function Delete Product
  async function deleteProduct(id) {
    const booleanFlag = await axiosInstance
      .delete(`/cart/${id}`)
      .then((result) => {
        setNumOfCartItem(result.data.data.products?.length);
        setTotalCartPrice(result.data.data.totalCartPrice);
        setAllProducts(result.data.data.products);
        return true;
      })
      .catch((error) => {
        console.log("error UpdateCount", error);
        return false;
      });
    return booleanFlag;
  }

  // *Function Delete Product To Cart And any Action
  async function removeProduct(id) {
    const booleanFlag = await deleteProduct(id);
    if (booleanFlag) {
      toast.success("Removed Product");
    } else {
      toast.error("Error");
    }
  }

  // *Function Clear Cart
  async function clearCart() {
    const booleanFlag = await axiosInstance
      .delete(`/cart`)
      .then(() => {
        setNumOfCartItem(0);
        setTotalCartPrice(0);
        setAllProducts([]);
        return true;
      })
      .catch((error) => {
        console.log("error UpdateCount", error);
        return false;
      });
    return booleanFlag;
  }

  return (
    <cartContext.Provider
      value={{
        postProductToCart,
        allProducts,
        numOfCartItem,
        totalCartPrice,
        cartID,
        cachedUserData,
        changeCountProduct,
        removeProduct,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Cart from './Components/Cart/Cart';
import ProtectedSafe from './Components/ProtectedSafe/ProtectedSafe';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetiels from './Components/ProductDetiels/ProductDetiels';
import CartContextProvider from './Context/CartContext';
import AuthenContextProvider from './Context/AuthenContext';
import { Toaster } from 'react-hot-toast';
import PaymentCash from './Components/PaymentCash/PaymentCash';
import Allorders from './Components/Allorders/Allorders';
import Brands from './Components/Brands/Brands';
import { Offline } from 'react-detect-offline';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "register",
        element: (
          <ProtectedSafe>
            <Register />{" "}
          </ProtectedSafe>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedSafe>
            <Login />{" "}
          </ProtectedSafe>
        ),
      },

      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "paymentCash",
        element: (
          <ProtectedRoute>
            <PaymentCash />
          </ProtectedRoute>
        ),
      },

      {
        path: "productDetiels/:id",
        element: (
          <ProtectedRoute>
            <ProductDetiels />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> }
     
    ],
  },
],
{
  basename: "/FreshCart",
}
);
// React -Query => Handle Async State (Cached Data)
const myClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthenContextProvider>
          <CartContextProvider>
            <RouterProvider  router={router} />
          </CartContextProvider>
        </AuthenContextProvider>
      </QueryClientProvider>
      <Toaster />
      <Offline>
        <div className="bg-dark fixed-bottom text-white">
          {" "}
          You are offline right now. Check your connection.
        </div>
      </Offline>
    </>
  );
}
export default App;

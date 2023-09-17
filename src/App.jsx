import {Route, Routes} from "react-router-dom";
import {Admin, Cart, Checkout, CheckoutDetails, Home, Login, OrderHistory, Register, Reset,} from "./pages";
import {AdminOnlyRoute, Layout} from "./components";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {ProductDetails} from "./components/products";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/eshop" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/eshop/login" element={<Login />} />
          <Route path="/eshop/register" element={<Register />} />
          <Route path="/eshop/reset" element={<Reset />} />

          <Route
            path="/eshop/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/eshop/product-details/:id" element={<ProductDetails />} />
          <Route path="/eshop/cart" element={<Cart />} />
          <Route path="/eshop/checkout-details" element={<CheckoutDetails />} />
          <Route path="/eshop/checkout" element={<Checkout />} />
          <Route path="/eshop/order-history" element={<OrderHistory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

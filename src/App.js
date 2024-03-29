import { Outlet, Route, Routes } from "react-router-dom";

import Checkout from "./pages/checkout/Checkout";
import Cart from "./pages/cart/Cart";
import { ROUTE } from "./constants";
import UserLogin from "./pages/user-login/UserLogin";
import UserRegister from "./pages/user-register/UserRegister";
import Home from "./pages/home/Home";
import Product from "./pages/products/product/Product";
import ProductDetail from "./pages/products/product-detail/ProductDetail";
import Address from "./pages/account/components/address/Address";
import Account from "./pages/account/Account";
import Profile from "./pages/account/components/profile/Profile";
import Order from "./pages/account/components/order/Order";
import OrderDetail from "./pages/account/components/order-detail/OrderDetail";
import ProtectedRouteUser from "./layouts/ProtectedRouteUser";
import ProtectedRouteAdmin from "./layouts/ProtectedRouteAdmin";
import Admin from "./admin-src/layouts/Admin";
import Products from "./admin-src/pages/products/Products";
import Orders from "./admin-src/pages/orders/Orders";
import Users from "./admin-src/pages/users/Users";
import Analysis from "./admin-src/pages/analysis/Analysis";
import Contact from "./pages/contact/Contact";
import AboutUs from "./pages/about/AboutUs";
import EditProduct from "./admin-src/pages/products/components/edit-product/EditProduct";
import AddProduct from "./admin-src/pages/products/components/add-new-product/AddProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTE.HOME_PAGE} element={<Home />} />
        <Route path={ROUTE.PRODUCT} element={<Product />} />
        <Route path={ROUTE.CONTACT} element={<Contact />} />
        <Route path={ROUTE.ABOUTUS} element={<AboutUs />} />
        <Route path={ROUTE.PRODUCT_DETAIL} element={<ProductDetail />} />
        <Route path={ROUTE.LOGIN} element={<UserLogin />} />
        <Route path={ROUTE.REGISTER} element={<UserRegister />} />

        <Route
          path={ROUTE.CHECK_OUT}
          element={
            <ProtectedRouteUser>
              <Checkout />
            </ProtectedRouteUser>
          }
        />
        <Route path={ROUTE.CART} element={<Cart />} />
        <Route
          path={ROUTE.ACCOUNT}
          element={
            <ProtectedRouteUser>
              <Account />
            </ProtectedRouteUser>
          }
        >
          <Route index element={<Profile />} />
          <Route path={ROUTE.PROFILE} element={<Profile />} />
          <Route path={ROUTE.ADDRESS} element={<Address />} />
          <Route path={ROUTE.ORDER} element={<Order />} />
          <Route path={ROUTE.ORDER_DETAIL} element={<OrderDetail />} />
        </Route>

        <Route
          path={ROUTE.ADMIN}
          element={
            <ProtectedRouteAdmin>
              <Admin />
            </ProtectedRouteAdmin>
          }
        >
          <Route index element={<Analysis />} />
          <Route path={ROUTE.PRODUCTS_ADMIN} element={<Products />} />
          <Route path={ROUTE.ADD_NEW_PRODUCT} element={<AddProduct />} />
          <Route path={ROUTE.PRODUCT_EDIT} element={<EditProduct />} />
          <Route path={ROUTE.ADD_NEW_PRODUCT} element={<Products />} />
          <Route path={ROUTE.ORDERS_ADMIN} element={<Orders />} />
          <Route path={ROUTE.USERS_ADMIN} element={<Users />} />
          <Route path={ROUTE.ANALYSIS_ADMIN} element={<Analysis />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

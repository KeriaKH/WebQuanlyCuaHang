import { Route, Routes } from "react-router-dom";
import {
  RequireAnonymous,
  RequireAuth,
  RequireRestaurantHost,
} from "./components/common/AuthRoutes";
import HomePageLayout from "./layouts/HomePageLayout";
import NoBannerLayout from "./layouts/NoBannerLayout";
import RestaurentLayout from "./layouts/RestaurentLayout";
import ForgetPage from "./pages/auth/ForgetPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import HomePage from "./pages/HomePage";
import AddProduct from "./pages/hostRes/AddProduct";
import CategoryPage from "./pages/hostRes/CategoryPage";
import Dashboard from "./pages/hostRes/Dashboard";
import OrderDetailPage from "./pages/hostRes/OrderDetailPage";
import OrderPage from "./pages/hostRes/OrderPage";
import ProductDetailPage from "./pages/hostRes/ProductDetailPage";
import ProductPage from "./pages/hostRes/ProductPage";
import UserPage from "./pages/hostRes/UserPage";
import VoucherPage from "./pages/hostRes/VoucherPage";
import ShopPage from "./pages/ShopPage";
import UnAuthorizedPage from "./pages/UnAuthorizePage";
import AddressPage from "./pages/user/AddressPage";
import CartPage from "./pages/user/CartPage";
import ChatPage from "./pages/user/ChatPage";
import HistoryDetailPage from "./pages/user/HistoryDetailPage";
import HistoryPage from "./pages/user/HistoryPage";
import PaymentPage from "./pages/user/PaymentPage";
import ProfilePage from "./pages/user/ProfilePage";
import TrackingPage from "./pages/user/TrackingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePageLayout />}>
        <Route index element={<HomePage />} />
        
      </Route>

      <Route path="/" element={<NoBannerLayout />}>

        <Route element={<RequireAnonymous />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="forget" element={<ForgetPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="tracking/:id" element={<TrackingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="history/:id" element={<HistoryDetailPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="address" element={<AddressPage />} />
          <Route path="shop/:id" element={<ShopPage />} />
        </Route>
        <Route path="unAuth" element={<UnAuthorizedPage />} />
      </Route>


      <Route element={<RequireRestaurantHost />}>
        <Route path="/" element={<RestaurentLayout />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Order" element={<OrderPage />} />
          <Route path="Order/:id" element={<OrderDetailPage />} />
          <Route path="Product" element={<ProductPage />} />
          <Route path="Product/add" element={<AddProduct />} />
          <Route path="Product/:id" element={<ProductDetailPage />} />
          <Route path="Voucher" element={<VoucherPage />} />
          <Route path="Category" element={<CategoryPage />} />
          <Route path="User" element={<UserPage />} />
        </Route>
      </Route>
    </Routes>
  );
}


import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import VehicleSpec from './pages/VehicleSpec'
import Checkout from './pages/Checkout'
import Register from './pages/Register'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import ShopCheckout from './pages/ShopCheckout'
import ShopOrderSuccess from './pages/ShopOrderSuccess'
import BookingSuccess from './pages/BookingSuccess'
import FetchBookings from './pages/FetchBookings'
import BackendHealth from './pages/BackendHealth'

import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import MyBookings from './pages/MyBookings'

import ProtectedRoute from './components/ProtectedRoute'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<Home />} />
      <Route path="/vehicles/:slug" element={<VehicleSpec />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/shop-checkout" element={<ShopCheckout />} />
      <Route path="/shop/order-success" element={<ShopOrderSuccess />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
      <Route path="/health" element={<BackendHealth />} />
      <Route path="/bookings" element={<FetchBookings />} />

      {/* Authentication pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected customer pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Route>
      <Route
  path="/terms"
  element={<TermsAndConditions />}
/>
<Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
    </Routes>
  )
}

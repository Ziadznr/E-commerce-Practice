import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/home-page';
import ProductByBrand from './pages/product-by-brand';
import ProductByCategory from './pages/product-by-category';
import ProductByKeyword from './pages/product-by-keyword';
import ProductDetails from './pages/product-details';
import AboutPage from './pages/about-page';
import RefundPage from './pages/refund-page';
import PrivacyPage from './pages/privacy-page';
import TermsPage from './pages/terms-page';
import HowToBuyPage from './pages/how-to-buy-page';
import ContactPage from './pages/contact-page';
import ComplainPage from './pages/complain-page';
import LoginPage from './pages/login-page';
import OtpPage from './pages/otp-page';
import UserStore from './store/UserStore';
import PrivateRoute from './components/PrivateRoute';
import ProfileForm from './components/user/profile-form';
import ProfilePage from './pages/profile-page';
import CartPage from './pages/cart-page';
import WishPage from './pages/wish-page';
import OrderPage from './pages/order-page';
import InvoiceDetails from './components/invoice/invoice-details';

const App = () => {
 // call it to get actual status

  return (
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 3000 }} />
      <Routes>
       <Route
  path="/"
  element={
    <PrivateRoute>
      <HomePage />
    </PrivateRoute>
  }
/>
        <Route path="/by-brand/:id" element={<ProductByBrand />} />
        <Route path="/by-category/:id" element={<ProductByCategory />} />
        <Route path="/by-keyword/:keyword" element={<ProductByKeyword />} />
        <Route path="/details/:id" element={<ProductDetails />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/how-to-buy" element={<HowToBuyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/complain" element={<ComplainPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/cart" element={<CartPage />} />
        <Route path="/wish" element={<WishPage/>} />
        <Route path="/invoice/:id" element={<InvoiceDetails />} />
        <Route path="/orders" element={<OrderPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

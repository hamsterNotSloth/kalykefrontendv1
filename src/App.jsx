import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header"
import NotFoundPage from "./pages/NotFoundPage"
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import UserProfilePage from "./pages/UserProfilePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductNotFoundProtectedRoute from "./ProtectedRoutes/ProductNotFoundProtectRoute";
import MyProfilePage from "./pages/MyProfilePage";
import HomePage from "./pages/HomePage";
import ComingSoonPage from "./pages/ComingSoonPage";
import LicensePage from "./pages/LicensePage";
import { getToken } from "./Token/token";
import { useEffect } from "react";
import { useGetMyProfileQuery, useGetUserProfileQuery } from "./redux/apiCalls/apiSlice";
import SearchResultsPage from "./pages/SearchResultsPage";
import Comments from "./components/ProductDetails/Comments";
import Footer from "./components/Footer/Footer";
import CategoryPage from "./pages/CategoryPage";
import WishlistPage from "./pages/WishlistPage";
import Success from "./components/messages/Success";
import DownloadableProductsPage from "./pages/DownloadableProductsPage";

function App() {
  return (
    <>
      <div className="bg-[#f4f4f4]">
        <Router>
          <Header />
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route element={<ProductNotFoundProtectedRoute />}>
              <Route path="/products/:id" element={<ProductDetailsPage />} />
            </Route>
            <Route path="/:search/search-results" element={<SearchResultsPage />} />
            <Route path="/user/:user_id" element={<UserProfilePage />} />
            <Route path="/user/my-profile" element={<MyProfilePage />} />
            <Route path="/products/Wishlist" element={<WishlistPage />} />
            <Route path="/products/downloaded-products" element={<DownloadableProductsPage />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />
            <Route path="/licenses" element={<LicensePage />} />

            {/* <Route path="/login" element={<Signup />} /> */}
            <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
            <Route path="/Category/:category" element={<CategoryPage />} />
            <Route path="/messages/success" element={<Success />}/>
          </Routes>
          <Footer />
        </Router>
        <ToastContainer position="bottom-right" autoClose={2000} closeOnClick pauseOnFocusLoss pauseOnHover={false} />
      </div>
    </>
  );
}

export default App;

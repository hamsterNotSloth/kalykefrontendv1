import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header"
import NotFoundPage from "./pages/NotFoundPage"
import ResetPassword from "./components/Authentication/ResetPassword";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import UserProfilePage from "./pages/UserProfilePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductNotFoundProtectedRoute from "./ProtectedRoutes/ProductNotFoundProtectRoute";
import HomePage from "./pages/HomePage";
import ComingSoonPage from "./pages/ComingSoonPage";
import { useEffect } from "react";
import {  useSignInUserMutation } from "./redux/apiCalls/apiSlice";
import SearchResultsPage from "./pages/SearchResultsPage";
import Footer from "./components/Footer/Footer";
import CategoryPage from "./pages/CategoryPage";
import WishlistPage from "./pages/WishlistPage";
import Success from "./components/messages/Success";
import DownloadableProductsPage from "./pages/DownloadableProductsPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/config";
import NotVerifiedProtectRoute from "./ProtectedRoutes/NotVerifiedProtectRoute";
import TermsAndConditions from "./components/Static/T&C";
import SupportPolicy from "./components/Static/Support";
import PrivacyPolicy from "./components/Static/Privacy";
import EmailVerified from "./components/messages/EmailVerified";
import Licence from "./components/Static/Licence";

function App() {
  const [signInUser] = useSignInUserMutation()
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const response = await signInUser({ credential: user, source: 'Email' });
          if (response.data && response.data.userData.status === true) {
            localStorage.setItem('userToken', response.data.userData.token);
          }
        } catch (error) {
          console.log(error)
        }
      }
    });

    return () => unsubscribe();
  }, []);
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
            {/* <Route path="/user/my-profile" element={<MyProfilePage />} /> */}
            <Route path="/products/Wishlist" element={<WishlistPage />} />
            <Route path="/products/downloaded-products" element={<DownloadableProductsPage />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />

            <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
            <Route path="/Category/:category" element={<CategoryPage />} />
            <Route path="/messages/success" element={<Success />} />
            <Route path="/model/upload" element={<NotVerifiedProtectRoute />} />
            <Route path="/T&C" element={<TermsAndConditions />} />
            <Route path="/support" element={<SupportPolicy />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/licencepolicy" element={<Licence />} />
            {/* <Route path="/model/upload" element={<Uploader />} /> */}
          </Routes>
          <Footer />
        </Router>
        <ToastContainer position="bottom-right" autoClose={2000} closeOnClick pauseOnFocusLoss pauseOnHover={false} />
      </div>
    </>
  );
}

export default App;

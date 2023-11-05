import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header"
import NotFoundPage from "./pages/NotFoundPage"
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import UserProfilePage from "./pages/UserProfilePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductNotFoundProtectedRoute from "./ProtectedRoutes/ProductNotFoundProtectRoute";
import MyProfilePage from "./pages/MyProfilePage";

function App() {
  return (
    <>
      <div className="bg-[#f4f4f4]">
        <ToastContainer position="top-right" autoClose={2000} closeOnClick pauseOnFocusLoss pauseOnHover={false} />
        <Router>
          <Header />
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route element={<ProductNotFoundProtectedRoute />}>
              <Route path="/products/:id" element={<ProductDetailsPage />} />
            </Route>
            {/* <Route path="/login" element={<Signup />} /> */}
            <Route path="/user/:user_id" element={<UserProfilePage />} />
            <Route path="/user/my-profile" element={<MyProfilePage />}/>
            <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header/Header"
import NotFoundPage from "./pages/NotFoundPage"
import ForgotPassword from "./component/Authentication/ForgotPassword";
import ResetPassword from "./component/Authentication/ResetPassword";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Signup from "./component/Authentication/signup/Signup";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  return (
    <>
      <div className="bg-[#f4f4f4]">
        <ToastContainer position="top-right" autoClose={2000} closeOnClick pauseOnFocusLoss pauseOnHover={false} />
        <Router>
          <Header />
          <Routes>
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<Signup />} />
            <Route path="/user-profile" element={<UserProfilePage />} />
            <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./component/Userprofile/UserProfile";
import Header from "./component/header/Header"
import NotFoundPage from "./page/NotFoundPage"
import ForgotPassword from "./component/Authentication/ForgotPassword";
import ResetPassword from "./component/Authentication/ResetPassword";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="bg-[#f4f4f4]">
        <Header />
        <ToastContainer position="top-right" autoClose={2000} closeOnClick pauseOnFocusLoss pauseOnHover={false}/>
        <Router>
          <Routes>
            <Route path="/forget-password" element={<ForgotPassword />}/>
            <Route path="*" element={<NotFoundPage />}/>
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

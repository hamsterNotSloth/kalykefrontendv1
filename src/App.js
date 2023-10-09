import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./component/Authentication/Signup";
import UserProfile from "./component/Userprofile/UserProfile";

function App() {
  return (
    <>
      <div className="bg-[#f4f4f4]">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;

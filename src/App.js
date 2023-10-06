import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./component/Authentication/Signup";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

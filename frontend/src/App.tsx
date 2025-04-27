import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/ui/Profile/Profile";



function App() {
  return (
    <Router>
      <nav>
        <a href="/">Home</a> | <a href="/profile">Profile</a>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

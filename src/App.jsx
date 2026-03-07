import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Profile from "./pages/Profile";
import MedicalHistory from "./pages/MedicalHistory";
import Assessment from "./pages/Assessment";
import AIAssistant from "./pages/AIAssistant";
import Store from "./pages/Store";
import BabyGrowth from "./pages/BabyGrowth";
import Navbar from "./components/Navbar";
// ... your other imports ...

function App() {
  return (
    <BrowserRouter>
      {/* Container to handle full height and layout */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh", 
        width: "100%" 
      }}>
        {/* Main content area */}
        <div style={{ flex: 1, width: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/medical" element={<MedicalHistory />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/store" element={<Store />} />
            <Route path="/baby-growth" element={<BabyGrowth />} />
          </Routes>
        </div>

        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import HomePage from "./pages/Home/HomePage";
import NotificationPage from "./pages/Notification/NotificationPage";
import ProfilePage from "./pages/Profile/ProfilePage";

// Components
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
// Imports End

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="flex max-w-6xl mx-auto">
          <Sidebar />
          <Routes>
            {/* Pages */}
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Routes>
          <RightPanel />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;

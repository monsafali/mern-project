import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import CallPage from "./pages/CallPage";
import LoginPage from "./pages/LoginPage";
import NotificationsPage from "./pages/NotificationsPage";
import OnboardingPage from "./pages/OnboardingPage";
import SignUp from "./pages/SignUp";

import toast, { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div data-theme="dim" className="h-screen">
      <button onClick={() => toast.success("button click")}>
        create a toast
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notification" element={<NotificationsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

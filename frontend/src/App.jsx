import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import { useAuthStore } from "./store/useAuthStore";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin size-12" />
      </div>
    );
  return (
    <div data-theme={theme} className="max-h-screen flex bg-base-200">
      {authUser && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home/> : <Navigate to="/login" />}
        />
        <Route path="/login" element={authUser ? <Home /> : <Login />} />
        <Route path="/signup" element={authUser ? <Home /> : <Signup />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
export default App;

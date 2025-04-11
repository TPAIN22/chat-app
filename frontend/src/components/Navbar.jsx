import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  AlignCenter,
  Hash,
  LogOut,
  MessageCircle,
  Settings,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout, toggleMenu, isMenuOpen } = useAuthStore();

  return (
    <div className="sm:px-24 relative bg-base-200">
      <div className="bg-base-100 text-base-content-content shadow-lg py-4 px-8 md:rounded-3xl max-w-7xl mx-auto relative ">
        {/* Mobile - Centered Hash Icon */}
        <div className="lg:hidden absolute left-1/2 top-8 transform -translate-x-1/2">
          <Hash size={24} className="text-base-content hover:text-secondary" />
        </div>

        <div className="container mx-auto flex justify-between items-center">
          {/* Left - Chat Icon */}
          {authUser ? (
            <Link to="/">
              <img
                src={
                  authUser?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                className="cursor-pointer size-10 rounded-full"
                alt="Profile"
              />
            </Link>
          ) : (
            <MessageCircle
              size={24}
              className="text-base-content hover:text-secondary"
            />
          )}

          {/* Desktop Links */}
          <div className="space-x-4 hidden lg:flex">
            <button
              className="text-base-content hover:text-secondary flex items-center"
              onClick={() => (window.location.href = "/settings")}
            >
              <Settings size={20} className="inline mr-2" />
              Settings
            </button>

            {authUser ? (
              <>
                <button
                  onClick={logout}
                  className="text-base-content hover:text-secondary flex items-center"
                >
                  <LogOut size={20} className="inline mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <button
                className="text-base-content hover:text-secondary flex items-center"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              className="text-base-content hover:text-secondary flex items-center"
              onClick={toggleMenu}
            >
              <AlignCenter size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMenu}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 w-64 h-full bg-base-300 p-6 shadow-lg z-50 transition-transform duration-300 transform translate-x-0">
            <div className="space-y-4">
              <button
                className="text-base-content hover:text-secondary flex items-center w-full"
                onClick={() => {
                  toggleMenu();
                  window.location.href = "/settings";
                }}
              >
                <Settings size={20} className="inline mr-2" />
                Settings
              </button>

              {authUser ? (
                <>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                      window.location.href = "/login";
                    }}
                    className="text-base-content hover:text-secondary flex items-center w-full"
                  >
                    <LogOut size={20} className="inline mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="text-base-content hover:text-secondary flex items-center w-full"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;

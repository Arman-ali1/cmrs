import { useState, useEffect } from "react";
import {
  HomeIcon,
  XMarkIcon,
  Bars3Icon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import image from "../../assets/images/logo-icon.png";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  // Open sidebar by default on large screens, closed on mobile.
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();

  // Ensure sidebar opens automatically when resizing to desktop.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTrades = () => {
    navigate("/dashboard/all-trades-user");
  };
  const handlePortfolio = () => {
    navigate("/dashboard/all-portfolio");
  };

  const handleChat = () => {
    navigate("admin-chat");
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 text-white bg-blue-950 rounded-md lg:hidden"
          aria-label="Open Sidebar"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      )}

      {/* Overlay for Mobile (clicking closes the sidebar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        style={{
          "--bs-heading-color": "#e6ecf0",
          "--bs-body-color": "#d3d7dc",
          "--bs-body-bg": "#0f1535",
          "--bs-body-bg-2": "#181f4a",
          "--bs-transparent-bg": "rgba(255, 255, 255, 0.10)",
          "--bs-border-color-translucent": "rgba(226, 232, 240, 0.15)",
          "--bs-border-color": "rgba(255, 255, 255, 0.15)",
          backgroundColor: "var(--bs-body-bg)",
          color: "var(--bs-body-color)",
          height: "100vh",
          padding: "20px",
          border: "1px solid var(--bs-border-color)",
        }}
        className={`fixed top-0 left-0 h-full text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out z-50 lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={image} className="w-8 h-8" alt="Logo" />
            <h5 className="text-lg font-semibold">CMRS</h5>
          </div>
          {/* Close Button (visible on mobile) */}
          <button
            className="lg:hidden p-1 hover:text-gray-300"
            onClick={() => setIsOpen(false)}
            aria-label="Close Sidebar"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-3 rounded-lg hover:bg-blue-950 transition"
              >
                <HomeIcon className="w-5 h-5 mr-3 text-white" />
                <span className="text-white">Dashboard</span>
              </a>
              <ul className="pl-8 space-y-1">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex text-white items-center text-sm p-2 hover:text-blue-950 hover:bg-blue-950 rounded-lg"
                  >
                    <ChevronRightIcon className="w-4 h-4 mr-2" />
                    User Management
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleTrades}
                    className="flex text-white items-center text-sm p-2 hover:text-blue-950 hover:bg-blue-950 rounded-lg"
                  >
                    <ChevronRightIcon className="w-4 h-4 mr-2" />
                    TradsList All
                  </button>
                </li>
                <li>
                  <button
                    onClick={handlePortfolio}
                    className="flex text-white items-center text-sm p-2 hover:text-blue-950 hover:bg-blue-950 rounded-lg"
                  >
                    <ChevronRightIcon className="w-4 h-4 mr-2" />
                    Portfolio
                  </button>
                  <button
                    onClick={handleChat}
                    className="flex text-white items-center text-sm p-2 hover:text-blue-950 hover:bg-blue-950 rounded-lg"
                  >
                    <ChevronRightIcon className="w-4 h-4 mr-2" />
                    Chats
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

import { useState } from "react";
import { HomeIcon, XMarkIcon, Squares2X2Icon, ChevronRightIcon } from "@heroicons/react/24/outline";
// import image from "../../assets/images/logo-icon.png";
import image from "../../../../assets/images/logo-icon.png";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);


  const chatHandle = () => {
    window.location.href = "/user-chat";
  }

  return (
    <aside
    style={{
        "--bs-heading-color": "#e6ecf0",
        "--bs-body-color": "#d3d7dc",
        "--bs-body-bg": "#0f1535",
        "--bs-body-bg-2": "#181f4a",
        "--bs-transparent-bg": "rgba(255, 255, 255, 0.10)",
        "--bs-border-color-translucent": "rgba(226, 232, 240, 0.15)",
        "--bs-border-color": "rgba(255, 255, 255, 0.15)",
        backgroundColor: "var(--bs-body-bg)",  // Applying background
        color: "var(--bs-body-color)", // Applying body text color
        height: "100vh",
        padding: "20px",
        border: "1px solid var(--bs-border-color)",
      }}
      className={`fixed top-0 left-0 h-full  text-white w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={image} className="w-8 h-8" alt="Logo" />
          <h5 className="text-lg font-semibold">Maxton</h5>
        </div>
        {/* Close Button (Mobile) */}
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
            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-blue-950 transition">
              <HomeIcon className="w-5 h-5 mr-3 text-white" />
              <span className="text-white">User Dashboard</span>
            </a>
            <ul className="pl-8 space-y-1">
              <li>
                <Link to="/user-profile" className="flex text-white items-center text-sm p-2 hover:text-blue-950 hover:bg-blue-950 rounded-lg">
                  <ChevronRightIcon className="w-4 h-4 mr-2" />
                  User Profile
                </Link>
              </li>
              <li>
                <Link to="/user-trades" className="flex text-white items-center text-sm p-2 hover:text-blue-950 hover:bg-blue-950 rounded-lg">
                  <ChevronRightIcon className="w-4 h-4 mr-2" />
                  Trad List
                </Link>
                <button onClick={chatHandle}  className="flex text-white items-center text-sm p-2 hover:text-blue-950 hover:bg-blue-950 rounded-lg">
                  <ChevronRightIcon className="w-4 h-4 mr-2" />
                  Chat
                </button>
              </li>
              {/* <li>
                <a href="#" className="flex items-center text-sm p-2 hover:text-gray-300">
                  <ChevronRightIcon className="w-4 h-4 mr-2" />
                  eCommerce
                </a>
              </li> */}
            </ul>
          </li>

          {/* <li>
            <a href="#" className="flex items-center p-3 rounded-lg hover:bg-blue-900 transition">
              <Squares2X2Icon className="w-5 h-5 mr-3" />
              <span>Widgets</span>
            </a>
            <ul className="pl-8 space-y-1">
              <li>
                <a href="#" className="flex items-center text-sm p-2 hover:text-gray-300">
                  <ChevronRightIcon className="w-4 h-4 mr-2" />
                  Data
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-sm p-2 hover:text-gray-300">
                  <ChevronRightIcon className="w-4 h-4 mr-2" />
                  Static
                </a>
              </li>
            </ul>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

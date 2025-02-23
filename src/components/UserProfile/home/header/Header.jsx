import React from "react";
import "./Header.css";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header({ logout }) {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/update-profile");
  };

  const handleLogout = () => {
    logout();
    navigate("");
  };

  return (
    <>
      {/*
        On large screens, we keep ml-64 to offset the sidebar.
        On smaller screens, we remove that margin (ml-0).
      */}
      <header className="ml-0 lg:ml-64 ">
        {/*
          We use flex-wrap so items can move to a new line if there's not enough space.
          px-4 and py-2 provide horizontal/vertical padding.
        */}
        <nav className="flex flex-row items-center justify-between gap-4 px-4 py-2 bg-transparent">
          {/*
            Hamburger Icon for Mobile 
            (Only visible on screens smaller than 'lg').
          */}
          <button
            className="text-white hover:text-gray-300 block lg:hidden"
            aria-label="Toggle Menu"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          {/*
            Search Bar
            - Full width on mobile (w-full).
            - Fixed width on larger screens (lg:w-[500px]).
            - flex-grow ensures it expands as needed.
            - We use order-2 on mobile to let the hamburger icon appear first if desired.
          */}
          <div className="relative flex-grow w-full lg:w-[500px] order-2 lg:order-none">
            <input
              className="w-full placeholder-gray-400 px-10 py-2 rounded-full bg-blue-950 text-white border border-gray-600 focus:outline-none"
              type="text"
              placeholder="Search"
              aria-label="Search"
              style={{
                "--bs-heading-color": "#e6ecf0",
                "--bs-body-color": "#d3d7dc",
                "--bs-body-bg": "#0f1535",
                "--bs-body-bg-2": "#181f4a",
                "--bs-transparent-bg": "rgba(255, 255, 255, 0.10)",
                "--bs-border-color-translucent": "rgba(226, 232, 240, 0.15)",
                "--bs-border-color": "rgba(255, 255, 255, 0.15)",
                backgroundColor: "var(--bs-body-bg)",
              }}
            />
            {/*
              Search Icon
            */}
            <MagnifyingGlassIcon className="absolute w-5 h-5 text-blue-400 left-3 top-1/2 transform -translate-y-1/2" />
            {/*
              Close (X) Icon
            */}
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/*
            Right Section (Notification & Profile Icons)
            We use order-1 on mobile so it can appear to the left or above the search bar 
            if the screen is too narrow. On larger screens, it's reset to default order.
          */}
          <div className="flex items-center gap-6 ml-auto order-1 lg:order-none">
            {/*
              Notification Icon with Badge
            */}
            <div className="relative">
              <BellIcon className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
              <span className="absolute top-0 right-0 bg-red-500 text-xs text-white px-1.5 py-0.5 rounded-full">
                5
              </span>
            </div>

            {/*
              Profile Menu
            */}
            <div className="cursor-pointer flex items-center justify-center ">
              <Dropdown
                align="end"
                className="float-end flex items-center justify-center text-white"
              >
                <DropdownToggle
                  as="a"
                  className="text-body content-none flex items-center justify-center"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Icon icon="tabler:user-circle" className="text-white text-3xl" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
                  <DropdownItem onClick={handleUpdate}>Update</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;

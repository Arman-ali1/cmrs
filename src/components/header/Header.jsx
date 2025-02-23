import React from "react";
import "./Header.css";
import {
	Bars3Icon,
	MagnifyingGlassIcon,
	XMarkIcon,
	BellIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
	Card,
	CardBody,
	Col,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Row,
} from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function Header({ logout }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<header className="ml-64">
			<nav className="navbar navbar-expand flex items-center justify-between gap-4 bg-transparent px-4">
				{/* Left Section - Sidebar Toggle */}
				<button
					className="text-white hover:text-gray-300"
					aria-label="Toggle Menu"
				>
					<Bars3Icon className="w-6 h-6" />
				</button>

				{/* Search Bar - Centered */}
				<div className="relative flex-grow lg:w-[500px] w-full">
					<input
						className="placeholder-gray-400 w-full px-10 py-2 rounded-full bg-blue-950 text-white border border-gray-600 focus:outline-none"
						type="text"
						placeholder="Search"
						aria-label="Search"
						style={{
							"--bs-heading-color": "#e6ecf0",
							"--bs-body-color": "#d3d7dc",
							"--bs-body-bg": "#0f1535",
							"--bs-body-bg-2": "#181f4a",
							"--bs-transparent-bg": "rgba(255, 255, 255, 0.10)",
							"--bs-border-color-translucent":
								"rgba(226, 232, 240, 0.15)",
							"--bs-border-color": "rgba(255, 255, 255, 0.15)",
							backgroundColor: "var(--bs-body-bg)",
							placeholderColor: "gray",
						}}
					/>
					{/* Search Icon */}
					<MagnifyingGlassIcon className="absolute w-5 h-5 text-blue-400 left-3 top-1/2 transform -translate-y-1/2" />
					{/* Close Icon */}
					<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200">
						<XMarkIcon className="w-5 h-5" />
					</button>
				</div>

				{/* Right Section - Notification & Profile Icons */}
				<div className="flex items-center gap-6 ml-auto">
					{/* Notification Icon with Badge */}
					<div className="relative">
						<BellIcon className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
						<span className="absolute top-0 right-0 bg-red-500 text-xs text-white px-1.5 py-0.5 rounded-full">
							5
						</span>
					</div>

					{/* Profile Icon */}
					<div className="cursor-pointer flex items-center justify-center">
						<Dropdown
							align={"end"}
							className="float-end flex items-center justify-center  text-white "
						>
							<DropdownToggle
								as="a"
								className="text-body content-none flex items-center justify-center"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								{/* <IconifyIcon icon='tabler:dots-vertical' className="fs-22 text-white" /> */}
								<Icon
									icon="tabler:user-circle"
									className="text-white text-3xl "
								/>
							</DropdownToggle>
							<DropdownMenu className="dropdown-menu-end">
								<DropdownItem onClick={handleLogout}>
									Log out
								</DropdownItem>
								<DropdownItem>Update</DropdownItem>
								{/* <DropdownItem>Something else here</DropdownItem> */}
							</DropdownMenu>
						</Dropdown>
						{/* <UserCircleIcon className="w-8 h-8 text-white hover:text-gray-300" /> */}
					</div>
				</div>
			</nav>
		</header>
	);
}

export default Header;

import React, { useEffect } from "react";
// import Navbar from './components/navbar/Navbar.jsx'
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import HeaderContainer from "./components/header/HeaderContainer.js";
import Cookies from "js-cookie";

// import ClientsSlider from './components/Practice/ClientsSlider.jsx'

function LayoutDashboard({ isAuthenticated, user }) {
	const navigate = useNavigate();

	useEffect(() => {
		var cookie = Cookies.get("token");
		if (cookie) {
			if (isAuthenticated && user?.role_id !== 2) {
				navigate("/");
			}
		} else {
			navigate("/");
		}
	}, [isAuthenticated, user, navigate]);

	return (
		isAuthenticated &&
		user?.role_id === 2 && (
			<div className="flex flex-col h-screen ">
				<HeaderContainer className="absolute" />
				<Sidebar className="pl-60 " />
				{/* <App className="absolute"/> */}
				<Outlet className="" />
				{/* <Footer className="absolute"/> */}
				{/* <Practice1/> */}
				{/* <ClientsSlider></ClientsSlider> */}
			</div>
		)
	);
}

export default LayoutDashboard;

import React, { useEffect } from "react";
import Cookies from "js-cookie";
// import Navbar from './components/navbar/Navbar.jsx'
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/UserProfile/home/Sidebar/Sidebar.jsx";
import HeaderContainer from "./components/UserProfile/home/header/HeaderContainer.js";

// import ClientsSlider from './components/Practice/ClientsSlider.jsx'

function LayoutUser({ isAuthenticated, user }) {
	const navigate = useNavigate();

	useEffect(() => {
		var cookie = Cookies.get("token");
		if (cookie) {
			if (isAuthenticated && user?.role_id !== 3) {
				navigate("/");
			}
		} else {
			navigate("/");
		}
	}, [isAuthenticated, user, navigate]);

	return (
		isAuthenticated &&
		user?.role_id === 3 && (
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

export default LayoutUser;

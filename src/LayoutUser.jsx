import React from "react";
// import Navbar from './components/navbar/Navbar.jsx'
import { Outlet } from "react-router-dom";
import Sidebar from "./components/UserProfile/home/Sidebar/Sidebar.jsx";
import HeaderContainer from "./components/UserProfile/home/header/HeaderContainer.js";

// import ClientsSlider from './components/Practice/ClientsSlider.jsx'

function LayoutUser() {
	return (
		<div className="flex flex-col h-screen ">
			<HeaderContainer className="absolute" />
			<Sidebar className="pl-60 " />
			{/* <App className="absolute"/> */}
			<Outlet className="" />
			{/* <Footer className="absolute"/> */}
			{/* <Practice1/> */}
			{/* <ClientsSlider></ClientsSlider> */}
		</div>
	);
}

export default LayoutUser;

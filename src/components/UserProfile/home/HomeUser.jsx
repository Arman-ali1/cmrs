import React from "react";
import Sidebar from "../home/Sidebar/Sidebar";
import UserProfile from "../UserProfile";
import HeaderContainer from "./header/HeaderContainer";

function HomeUser() {
	return (
		<div>
			<HeaderContainer />
			<Sidebar />
			<UserProfile />
		</div>
	);
}

export default HomeUser;

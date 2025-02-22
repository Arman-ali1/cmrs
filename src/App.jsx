import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import SignIn from "./components/home/SignIn";
import LayoutUser from "./LayoutUser";
import LayoutDashboard from "./LayoutDashboard";
import UserProfile from "./components/UserProfile/UserProfile";
import UpdateUserForm from "./components/UserProfile/home/updateprofile/UpdateUserForm";
import UpdateUserFormAdmin from "./components/updateprofile/UpdateUserForm";
// import Trades from "./components/adminsidetrads/adminsidetradslist/Adminsidetradslist";
import Trades from "./components/UserProfile/trads/Trades";
import Main from "./components/main/Main";
import AllTrades from "./components/adminsidetrads/alltrades/AllTrades";
import AddUser from "./components/adminadduser/AddUser";
import UserChatBox from "./components/UserProfile/chat/UserChatBox";
// import userTrades from "./components/UserProfile/trads/Trades";

import Home from "./components/home/Home";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AdminChatBox from "./components/adminsidetrads/adminsidetradslist/chat/AdminChatBox";

function App({ isAuthenticated, user, updateUser }) {
	useEffect(() => {
		const token = Cookies.get("accessToken");
		console.log(token);
		if (token) {
			const decodedUser = jwtDecode(token);
			updateUser(decodedUser);
		}
	}, [Cookies, updateUser]);

	return (
		<Router>
			<Routes>
			<Route path="admin-chat" element={<AdminChatBox />} />
			<Route path="user-chat" element={<UserChatBox />} />
				<Route
					path="/"
					element={
						<Home
							isAuthenticated={isAuthenticated}
							role={user?.role_id}
						/>
					}
				/>
				<Route
					path="/sign-up"
					element={
						<SignIn
							isAuthenticated={isAuthenticated}
							role={user?.role_id}
						/>
					}
				/>
				<Route
					path=""
					element={
						isAuthenticated && user.role_id === 3 ? (
							<LayoutUser />
						) : (
							<Navigate to="/" />
						)
					}
				>
					<Route path="user-profile" element={<UserProfile />} />
					<Route path="update-profile" element={<UpdateUserForm />} />
					<Route path="user-trades" element={<Trades />} />
					
				</Route>
				<Route
					path="dashboard"
					element={
						isAuthenticated && user.role_id === 2 ? (
							<LayoutDashboard />
						) : (
							<Navigate to="/" />
						)
					}
				>
					<Route path="" element={<Main />} />
					<Route
						path="update-user"
						element={<UpdateUserFormAdmin />}
					/>
					<Route path="user-trades" element={<Trades />} />
					<Route path="all-trades" element={<AllTrades />} />
					<Route path="add-user" element={<AddUser />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;

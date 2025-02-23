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
// import UserChatBox from "./components/UserProfile/chat/UserChatBox";
// import userTrades from "./components/UserProfile/trads/Trades";

import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// import AdminChatBox from "./components/adminsidetrads/adminsidetradslist/chat/AdminChatBox";
import Pagelayout1 from "./components/UserProfile/chat/UserChat.jsx";
import Pagelayout2 from "./components/adminsidetrads/adminsidetradslist/chat/AdminChat.jsx";
import HomeContainer from "./components/home/HomeContainer.js";
import LayoutDashboardContainer from "./LayoutDashboardContainer.js";
import LayoutUserContainer from "./LayoutUserContainer.js";
import TradesList from "./components/UserProfile/trads/tradslist/TradesList.jsx";

function App({ isAuthenticated, user, updateUser }) {
	const [token, setToken] = useState(Cookies.get("token"));

	useEffect(() => {
		var decodedUser;
		var cookie = Cookies.get("token");
		setToken(cookie);
		if (cookie) {
			decodedUser = jwtDecode(cookie);
			updateUser(decodedUser);
		}
	}, [isAuthenticated, updateUser]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomeContainer />} />
				<Route
					path="/sign-up"
					element={
						<SignIn
							isAuthenticated={isAuthenticated}
							role={user?.role_id}
						/>
					}
				/>
				<Route path="" element={<LayoutUserContainer />}>
					<Route path="user-profile" element={<UserProfile />} />
					<Route path="update-profile" element={<UpdateUserForm />} />
					<Route path="user-trades" element={<Trades />} />
					<Route path="user-chat" element={<Pagelayout1 />} />
					{/* <Route path="admin-chat" element={<AdminChatBox />} /> */}
				</Route>
				<Route path="dashboard" element={<LayoutDashboardContainer />}>
					<Route path="" element={<Main />} />
					<Route
						path="update-user"
						element={<UpdateUserFormAdmin />}
					/>
					<Route path="user-trades" element={<Trades />} />
					<Route path="all-trades" element={<TradesList />} />
					<Route path="add-user" element={<AddUser />} />
					<Route path="admin-chat" element={<Pagelayout2 />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;

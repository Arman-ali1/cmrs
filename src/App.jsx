import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import SignIn from "./components/home/SignIn";

import UserProfile from "./components/UserProfile/UserProfile.jsx";
import UpdateUserForm from "./components/UserProfile/home/updateprofile/UpdateUserForm";
import UpdateUserFormAdmin from "./components/updateprofile/UpdateUserForm";

import Trades from "./components/UserProfile/trads/Trades";
import Main from "./components/main/Main";

import AddUser from "./components/adminadduser/AddUser";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import Pagelayout1 from "./components/UserProfile/chat/UserChatBox.jsx";
import Pagelayout2 from "./components/adminsidetrads/adminsidetradslist/chat/AdminChatBox.jsx";
import HomeContainer from "./components/home/HomeContainer.js";
import LayoutDashboardContainer from "./LayoutDashboardContainer.js";
import LayoutUserContainer from "./LayoutUserContainer.js";
import TradesList from "./components/UserProfile/trads/Trades.jsx";
import Portfolio from "./components/UserProfile/portfolio/Portfolio.jsx";
import Tradesuser from "./components/adminsidetrads/trads/Tradesuser.jsx";
import Portfolioall from "./components/adminsidetrads/portfolio/Portfolioall.jsx";
import Tradesuserall from "./components/adminsidetrads/trads/Tradesuserall.jsx";
import Slotmanagement from "./components/admincomponent/slotmanagemant/Slotmanagement.jsx";
import SlotList from "./components/admincomponent/slots/SlotList.jsx";
import SlotEdit from "./components/admincomponent/slots/SlotEdit.jsx";
import UserSlotList from "./components/UserProfile/slot/UserSlotList.jsx";

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
					<Route path="user-portfolio" element={<Portfolio />} />
					<Route path="user-slots" element={<UserSlotList />} />

					<Route path="user-chat" element={<Pagelayout1 />} />
					{/* <Route path="admin-chat" element={<AdminChatBox />} /> */}
				</Route>
				<Route path="dashboard" element={<LayoutDashboardContainer />}>
					<Route path="" element={<Main />} />
					<Route
						path="update-user"
						element={<UpdateUserFormAdmin />}
					/>
					<Route path="user-trades" element={<Tradesuser />} />
					<Route path="all-trades" element={<TradesList />} />
					<Route path="add-user" element={<AddUser />} />
					<Route path="all-portfolio" element={<Portfolioall />} />
					<Route path="all-trades-user" element={<Tradesuserall />} />
					<Route path ="slot-management" element={<SlotList />} />
					<Route path="add-slot" element={<Slotmanagement />} />
					<Route path="edit-slot" element={<SlotEdit />} />

					<Route path="admin-chat" element={<Pagelayout2 />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;

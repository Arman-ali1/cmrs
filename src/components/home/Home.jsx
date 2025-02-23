import { useEffect } from "react";
import LoginContainer from "../login/LoginContainer";
import { useNavigate } from "react-router-dom";
import { redirectUserBasedOnRole } from "../../utils/userAuthUtils";

function Home({ isAuthenticated, user }) {
	const navigate = useNavigate();

	useEffect(() => {
		isAuthenticated &&
			user &&
			redirectUserBasedOnRole(isAuthenticated, user?.role_id, navigate);
	}, [isAuthenticated, user, navigate]);

	return (
		<div className="flex flex-col items-center justify-center h-screen ">
			<LoginContainer />
		</div>
	);
}

export default Home;

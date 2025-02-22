import { useEffect } from "react";
import SignUp from "../sign-up/SignUp";
import { useNavigate } from "react-router-dom";
import { redirectUserBasedOnRole } from "../../utils/userAuthUtils";

function SignIn({ isAuthenticated, role }) {
	const navigate = useNavigate();

	useEffect(() => {
		redirectUserBasedOnRole(isAuthenticated, role, navigate);
	}, [isAuthenticated, role, navigate]);

	return (
		<div className="flex flex-col items-center justify-center h-screen ">
			<SignUp />
		</div>
	);
}

export default SignIn;

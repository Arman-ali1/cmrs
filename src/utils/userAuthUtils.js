export const redirectUserBasedOnRole = (isAuthenticated, role, navigate) => {
	if (isAuthenticated) {
		if (role === 2) {
			navigate("/dashboard");
		} else if (role === 3) {
			navigate("/user-profile");
		}
	} else {
		navigate("/");
	}
};

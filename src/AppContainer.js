import { connect } from "react-redux";
import App from "./App";
import { loginSuccess } from "./app/store/actions/userAuthActions";

const mapStateToProps = (state) => ({
	isAuthenticated: state.userAuth.isAuthenticated,
	user: state.userAuth.user,
});

const mapDispatchToProps = (dispatch) => ({
	updateUser: (credentials) => {
		dispatch(loginSuccess(credentials));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

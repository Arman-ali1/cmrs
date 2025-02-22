import { connect } from "react-redux";
import Login from "./Login";
import { login } from "../../app/store/actions/userAuthActions";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
	login: (credentials) => {
		dispatch(login(credentials));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

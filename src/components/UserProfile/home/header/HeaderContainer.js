import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { logout } from "../../../../app/store/actions/userAuthActions";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
	logout: () => {
		dispatch(logout());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

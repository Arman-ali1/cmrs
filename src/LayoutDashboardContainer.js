import { connect } from "react-redux";
import LayoutDashboard from "./LayoutDashboard";

const mapStateToProps = (state) => ({
	isAuthenticated: state.userAuth.isAuthenticated || false,
	user: state.userAuth.user || null,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutDashboard);

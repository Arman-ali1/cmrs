import { connect } from "react-redux";
import Home from "./Home";

const mapStateToProps = (state) => ({
	isAuthenticated: state.userAuth.isAuthenticated || false,
	user: state.userAuth.user || null,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

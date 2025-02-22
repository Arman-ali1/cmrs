import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions/actionTypes";

const initialState = {
	isAuthenticated: false,
	user: null,
	error: null,
};

const userAuthReducers = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				error: null,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: null,
				error: null,
			};
		default:
			return state;
	}
};

export default userAuthReducers;

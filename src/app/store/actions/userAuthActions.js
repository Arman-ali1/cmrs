import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./actionTypes";
import { loginApi } from "../../../apis/userApi";
import Cookies from "js-cookie";

export const loginSuccess = (user) => {
	return {
		type: LOGIN_SUCCESS,
		payload: user,
	};
};

export const loginFailure = (error) => {
	return {
		type: LOGIN_FAILURE,
		payload: error,
	};
};

export const logout = () => {
	Cookies.remove("token");
	return {
		type: LOGOUT,
	};
};

export const login = (credentials) => {
	return async (dispatch) => {
		try {
			const response = await loginApi(credentials);
			const { token, user } = response.data;
			dispatch(loginSuccess(user));
			Cookies.set("token", token);
			return Promise.resolve(user.role_id);
		} catch (error) {
			dispatch(loginFailure(error.response.data.message));
			return Promise.reject(error.response.data.message);
		}
	};
};

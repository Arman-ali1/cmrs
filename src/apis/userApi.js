import axios from "axios";

const USER_API_BASE_URL = "https://csrm.onrender.com/api/v1/user";

export const loginApi = (credentials) => {
	return axios.post(`${USER_API_BASE_URL}/login`, credentials);
};

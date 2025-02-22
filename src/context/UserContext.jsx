// import axiosInstance from '@/libs/request';

import React, { createContext, useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
import axios from "axios";

export const AtpFormContext = createContext();

const ATPFormProvider = ({ children }) => {
	const userOuth = async () => {
		try {
			// console.log("user",user);
			const { data } = await axios.post(`/api/user_logout`, {
				user_id: user.id,
			});
			if (data.status === 200) {
				router.push("/");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const Loginu = async (formData) => {
		console.log(formData);

		try {
			const { data } = await axios
				.post(`http://localhost:3000/api/v1/user/login`, {
					email: "ananya.mishra1@example.com",
					password: "AnanyaPass567!",
				})
				.then((response) => {
					// login(response.data);
					console.log(response.data);
				});
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<AtpFormContext.Provider value={{ Loginu, userOuth }}>
			{children}
		</AtpFormContext.Provider>
	);
};

export default ATPFormProvider;

import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { redirectUserBasedOnRole } from "../../utils/userAuthUtils";

function Login({ login }) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		role: "2", // Default role
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const roleId = await login(formData);

		redirectUserBasedOnRole(true, roleId, navigate);
	};

	return (
		<Container
			maxWidth="sm"
			className="relative rounded-lg p-6 border-4 border-blue-700 bg-black bg-opacity-60 text-white shadow-lg"
		>
			<Box className="relative mt-8 flex flex-col items-center">
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					className="mt-3 space-y-6"
				>
					<TextField
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={formData.email}
						onChange={handleChange}
						InputProps={{ style: { color: "white" } }}
					/>
					<TextField
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={formData.password}
						onChange={handleChange}
						InputProps={{ style: { color: "white" } }}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						className="mt-3 mb-2 bg-blue-600 hover:bg-blue-700"
					>
						Login
					</Button>

					<Box className="mt-4 flex justify-center">
						<p className="text-white pr-4">
							Don't have an account?
						</p>
						<Button
							href="/sign-up"
							variant="contained"
							className="bg-blue-600 hover:font-bold hover:text-red-900"
						>
							Sign Up
						</Button>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUserForm = ({ onCancel }) => {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		phone_number: "",
		membership_type: "gold",
		username: "",
		country_code: "US",
		role_id: 2,
	});

	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			const response = await fetch(
				"http://localhost:8000/api/v1/user/add",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			if (data.status === 201) {
				setMessage("User added successfully!");
				setFormData({
					first_name: "",
					last_name: "",
					email: "",
					password: "",
					phone_number: "",
					membership_type: "gold",
					username: "",
					country_code: "US",
					role_id: 2,
				});

				setTimeout(() => navigate("/user-profile"), 2000);
			} else {
				setMessage(`Error: ${data.error || "Failed to add user"}`);
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setMessage("Network error. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		setFormData({
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			phone_number: "",
			membership_type: "gold",
			username: "",
			country_code: "US",
			role_id: 2,
		});
		navigate("/user-profile");
		if (onCancel) onCancel();
	};

	const countryList = [
		{ name: "United States", code: "US" },
		{ name: "United Kingdom", code: "GB" },
		{ name: "Canada", code: "CA" },
		{ name: "Australia", code: "AU" },
		{ name: "Germany", code: "DE" },
		{ name: "France", code: "FR" },
		{ name: "India", code: "IN" },
		{ name: "China", code: "CN" },
		{ name: "Japan", code: "JP" },
		{ name: "Brazil", code: "BR" },
	];

	return (
		<div className=" ml-64 p-10">
			<div className="max-w-4xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg">
				<h2 className="text-center text-2xl font-semibold mb-6">
					Update Profile
				</h2>

				{message && (
					<p
						className={`alert ${
							message.includes("Error")
								? "alert-danger"
								: "alert-success"
						}`}
					>
						{message}
					</p>
				)}

				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-gray-300 mb-1">
								First Name.
							</label>
							<input
								type="text"
								name="first_name"
								className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
								value={formData.first_name}
								onChange={handleChange}
								required
							/>
						</div>
						<div>
							<label className="block text-gray-300 mb-1">
								Last Name
							</label>
							<input
								type="text"
								name="last_name"
								className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
								value={formData.last_name}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className="mt-4">
						<label className="block text-gray-300 mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mt-4">
						<label className="block text-gray-300 mb-1">
							Password
						</label>
						<input
							type="password"
							name="password"
							className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mt-4">
						<label className="block text-gray-300 mb-1">
							Phone Number
						</label>
						<input
							type="text"
							name="phone_number"
							className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
							value={formData.phone_number}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="mt-4">
						<label className="block text-gray-300 mb-1">
							Username
						</label>
						<input
							type="text"
							name="username"
							className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
						<div>
							<label className="block text-gray-300 mb-1">
								Membership Type
							</label>
							<select
								name="membership_type"
								className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
								value={formData.membership_type}
								onChange={handleChange}
							>
								<option value="gold">Gold</option>
								<option value="silver">Silver</option>
								<option value="bronze">Bronze</option>
							</select>
						</div>

						<div>
							<label className="block text-gray-300 mb-1">
								Country Code
							</label>
							<select
								name="country_code"
								className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
								value={formData.country_code}
								onChange={handleChange}
								required
							>
								{countryList.map((country) => (
									<option
										key={country.code}
										value={country.code}
									>
										{country.name} ({country.code})
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="flex justify-between mt-6">
						<button
							type="button"
							className="w-1/2 py-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
							onClick={handleCancel}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="w-1/2 py-3 ml-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
							disabled={loading}
						>
							{loading ? "saving..." : "save User"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddUserForm;

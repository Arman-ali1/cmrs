import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		firstName: "John",
		lastName: "Doe",
		email: "johndoe@example.com",
		phone: "123-456-7890",
		patreonId: "patreon123",
		membership: "Premium",
		username: "johndoe",
		country: "USA",
		roleId: "2",
	});

	const handleEdit = () => {
		navigate("/update-profile");
	};

	return (
		<div className="container ml-32 w-100">
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-blue-400 font-extrabold text-2xl py-2">
					Welcome Again to CMRS
				</h1>
				<div className="p-10 bg-gray-900 text-white min-h-screen flex flex-col items-center lg:w-2/3 w-100 border-4 border-blue-600">
					<div className="flex flex-col items-center mb-10">
						<p>Welcome Profile</p>
					</div>
					<div className="flex flex-col items-center mb-8">
						<Avatar
							alt="User Avatar"
							src="https://via.placeholder.com/100"
							sx={{
								width: 120,
								height: 120,
								border: "4px solid #ec4899",
								boxShadow:
									"0px 4px 10px rgba(236, 72, 153, 0.5)",
								transition: "transform 0.3s",
								"&:hover": { transform: "scale(1.1)" },
							}}
						/>
						<h1 className="text-4xl font-bold mt-4">
							{formData.firstName} {formData.lastName}
						</h1>
						<p className="text-gray-400 text-lg">
							Membership: {formData.membership}
						</p>
						<p className="text-gray-400">
							Country: {formData.country}
						</p>
						<button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300">
							Send Message
						</button>
					</div>

					<div className="w-full max-w-3xl mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="p-6 bg-gray-800 rounded-lg shadow-lg transition-all hover:shadow-xl">
							<h2 className="text-xl font-semibold mb-4 border-b pb-2">
								About
							</h2>
							<p>
								<strong>Full Name:</strong> {formData.firstName}{" "}
								{formData.lastName}
							</p>
							<p>
								<strong>Email:</strong> {formData.email}
							</p>
							<p>
								<strong>Phone:</strong> {formData.phone}
							</p>
							<p>
								<strong>Membership:</strong>{" "}
								{formData.membership}
							</p>
							<p>
								<strong>Country:</strong> {formData.country}
							</p>
						</div>
						<div className="p-6 bg-gray-800 rounded-lg shadow-lg transition-all hover:shadow-xl">
							<h2 className="text-xl font-semibold mb-4 border-b pb-2">
								Accounts
							</h2>
							<p>
								<strong>Patreon ID:</strong>{" "}
								{formData.patreonId}
							</p>
							<p>
								<strong>Username:</strong> {formData.username}
							</p>
							<p>
								<strong>Role ID:</strong> {formData.roleId}
							</p>
						</div>
					</div>
					<button
						onClick={handleEdit}
						className="mt-4 bg-gradient-to-r from-yellow-500 to-green-500 hover:from-yellow-600 hover:to-green-600 text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300"
					>
						Edit Profile
					</button>
				</div>
			</div>
		</div>
	);
}

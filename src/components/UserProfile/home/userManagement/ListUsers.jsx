import React, { useEffect, useState } from "react";
import defaultAvatar from "../../assets/images/avatars/02.png"; // Ensure this path is correct

function ListUsers({ user }) {
	return (
		<div className="col-md-4 mb-4">
			<div
				className="card shadow-sm"
				style={{
					"--bs-heading-color": "#e6ecf0",
					"--bs-body-color": "#d3d7dc",
					"--bs-body-bg": "#0f1535",
					"--bs-body-bg-2": "#181f4a",
					"--bs-transparent-bg": "rgba(255, 255, 255, 0.10)",
					"--bs-border-color-translucent":
						"rgba(226, 232, 240, 0.15)",
					"--bs-border-color": "rgba(255, 255, 255, 0.15)",
					backgroundColor: "var(--bs-body-bg)",
					placeholderColor: "gray",
				}}
			>
				{/* Use a placeholder avatar if user.avatar is missing */}
				<img
					src={user.avatar || defaultAvatar}
					className="card-img-top"
					alt={user.name || "User Name"}
				/>
				<div className="card-body">
					<h5 className="card-title">{user.name || "User Name"}</h5>
					<p className="card-text">
						{user.email || "email@example.com"}
					</p>
					<a
						href={`mailto:${user.email || "email@example.com"}`}
						className="btn btn-primary btn-sm"
					>
						Contact
					</a>
				</div>
			</div>
		</div>
	);
}

export default function UsersList() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch("https://csrm.onrender.com/api/v1/user")
			.then((response) => response.json())
			.then((data) => {
				if (data.users) {
					const mappedUsers = data.users.map((user) => ({
						id: user.user_id,
						name: `${user.first_name} ${user.last_name}`,
						email: user.email,
						avatar: "", // Placeholder image as API does not provide avatar
					}));
					setUsers(mappedUsers);
				}
			})
			.catch((error) => console.error("Error fetching users:", error));
	}, []);

	return (
		<div className="container">
			<div className="row">
				{users.map((user) => (
					<ListUsers key={user.id} user={user} />
				))}
			</div>
		</div>
	);
}

// export default ListUsers;

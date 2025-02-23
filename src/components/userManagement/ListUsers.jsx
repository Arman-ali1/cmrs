import React, { useEffect, useState } from "react";
import defaultAvatar from "../../assets/images/avatars/02.png";
import UpdateUserForm from "../updateprofile/UpdateUserForm";
import { Link, useNavigate } from "react-router-dom";

function ListUsers({ user, onUpdate }) {
	const navigate = useNavigate();

	const handleEdit = () => {
		// onUpdate(user.id);
		navigate("/dashboard/update-user");
	};

	const handleTrades = () => {
		navigate("/dashboard/user-trades");
	};
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
				}}
			>
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
						href={`mailto:${user.email}`}
						className="btn btn-primary btn-sm"
					>
						Contact
					</a>
					{/* <Link to={`/update-user/${user.id}`} */}
					<button
						onClick={handleEdit}
						className="btn btn-warning btn-sm ms-2"
						// onClick={() => onUpdate(user.id)}
					>
						Update
					</button>
					<button
						className="btn btn-warning btn-sm ms-2"
						// onClick={() => onUpdate(user.id)}
						onClick={handleTrades}
					>
						TradeList
					</button>
				</div>
			</div>
		</div>
	);
}

export default function UsersList() {
	const [users, setUsers] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState(null);

	useEffect(() => {
		fetch("https://csrm.onrender.com/api/v1/user")
			.then((response) => response.json())
			.then((data) => {
				if (data.users) {
					const mappedUsers = data.users.map((user) => ({
						id: user.user_id,
						name: `${user.first_name} ${user.last_name}`,
						email: user.email,
						avatar: "",
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
					<ListUsers
						key={user.id}
						user={user}
						onUpdate={setSelectedUserId}
					/>
				))}
			</div>
		</div>
	);
}

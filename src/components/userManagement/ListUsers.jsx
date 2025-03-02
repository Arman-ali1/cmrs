import React, { useState, useEffect } from "react";
import defaultAvatar from "../../assets/images/avatars/02.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListUsers({ user, onUpdate }) {
	const navigate = useNavigate();
	// Initialize local state with the user's initial verification status
	const [isVerified, setIsVerified] = useState(user.isVerified);
	console.log("User verification status:", user);
	const [chatButtonLabel, setChatButtonLabel] = useState("Chat");
	const adminId = "A1";
	useEffect(() => {
		fetch("https://crms-chat-backend.onrender.com/api/chats")
			.then((res) => res.json())
			.then((data) => {
				const conversation = data.filter(
					(msg) =>
						(msg.userId === adminId &&
							msg.targetUserId === user.id) ||
						(msg.userId === user.id && msg.targetUserId === adminId)
				);

				if (conversation.length > 0) {
					const lastMessage = conversation[conversation.length - 1];
					// If the last message's author is "user", display "Pending"

					if (lastMessage.author === "User") {
						console.log("Last message:", lastMessage.author);
						setChatButtonLabel("Pending");
					} else {
						setChatButtonLabel("Chat");
					}
				} else {
					setChatButtonLabel("Chat");
				}
			})
			.catch((err) => console.error("Error fetching chats:", err));
	}, [user.id]);

	const handleEdit = () => {
		navigate("/dashboard/update-user");
	};

	const handleTrades = () => {
		console.log("Trades user id", user.id);
		navigate("/dashboard/user-trades", { state: { userId: user.id } });
	};

	const handleChat = () => {
		console.log("Chat user id", user.id);
		navigate("/dashboard/admin-chat", { state: { userId: user.id } });
	};

	const handleVerification = () => {
		// Toggle the verification status
		const updatedVerification = !isVerified;

		axios
			.patch(
				`https://csrm.onrender.com/api/v1/user/update-verification/${user.id}`,
				{ isVerified: updatedVerification }
			)
			.then((response) => {
				console.log(
					"User verification updated successfully:",
					response.data
				);
				// Check if the API returned a success message ("ok") before updating state
				if (response.status === 200) {
					setIsVerified(updatedVerification);
				}
			})
			.catch((error) => {
				console.error("Error updating user verification:", error);
			});
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
					<button
						onClick={handleEdit}
						className="btn btn-warning btn-sm ms-2"
					>
						Update
					</button>
					<button
						className="btn btn-warning btn-sm ms-2"
						onClick={handleTrades}
					>
						TradeList
					</button>
					<button
						className={`btn btn-sm ms-2 position-relative ${
							chatButtonLabel === "Pending"
								? "btn-warning"
								: "btn-warning"
						}`}
						onClick={handleChat}
					>
						{/* Button Text */}
						{chatButtonLabel === "Pending"
							? "Pending"
							: chatButtonLabel}

						{/* Badge shown only if "Pending" */}
						{chatButtonLabel === "Pending" && (
							<span
								className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger"
								style={{
									padding: "0.25rem 0.4rem",
									fontSize: "0.7rem",
									transform: "translate(-50%, 30%)", // Adjust vertical/horizontal offset as needed
								}}
							>
								1+
							</span>
						)}
					</button>

					<button
						className={`btn btn-sm ms-2 ${
							isVerified ? "btn-primary" : "btn-warning"
						}`}
						onClick={handleVerification}
					>
						{isVerified ? "Verified" : "Not Verified"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default function UsersList() {
	const [users, setUsers] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState(null);

	// Fetch users on component mount
	React.useEffect(() => {
		fetch("https://csrm.onrender.com/api/v1/user")
			.then((response) => response.json())
			.then((data) => {
				console.log("Data:", data);

				if (data.users) {
					const mappedUsers = data.users.map((user) => ({
						id: user.user_id,
						name: `${user.first_name} ${user.last_name}`,
						email: user.email,
						avatar: "",
						isVerified: user.isVerified, // make sure to pass the verification status
					}));
					setUsers(mappedUsers);
					console.log("Users:", mappedUsers);
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

// AdminChatBox.jsx
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Tradesuser from "../../trads/Tradesuser";
import Portfolio from "../../portfolio/Portfolio";
import "./AdminChatBox.css";

// Hard-coded admin and target user details
const adminId = "A1";
const adminUsername = "Admin";
// const targetUserId = 'U1';

const AdminChatBox = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const socketRef = useRef(null);
	const location = useLocation();
	const { userId } = location.state || {};
	const [targetUserId, setTargetUserId] = useState(userId);
	const [currTab, setCurrTab] = useState("trades");
	const [targetUserName, setTargetUserName] = useState("");
	console.log("User in admin side ID", userId);
	const userdata = useSelector((state) => state);
	// console.log("User Profile",useSelector(state => state));
	console.log(" admin Profile id", userdata.userAuth.user.user_id);
	// const [adminId, setAdminId] = useState(userdata.userAuth.user.user_id);

	useEffect(() => {
		const getUserByIdUrl = `https://csrm.onrender.com/api/v1/user/${userId}`;
		fetch(getUserByIdUrl)
			.then((res) => res.json())
			.then((data) => {
				const targetUser = data.user;
				setTargetUserName(
					`${targetUser.first_name} ${targetUser.last_name}`
				);
			});
	}, [userId]);

	useEffect(() => {
		// Establish a single socket connection
		socketRef.current = io("https://crms-chat-backend.onrender.com");

		// Fetch all messages for this conversation
		fetch("https://crms-chat-backend.onrender.com/api/chats")
			.then((res) => res.json())
			.then((data) => {
				const filtered = data.filter(
					(msg) =>
						(msg.userId === adminId &&
							msg.targetUserId === targetUserId) ||
						(msg.userId === targetUserId &&
							msg.targetUserId === adminId)
				);
				setMessages(filtered);
			})
			.catch((err) => console.error("Error fetching chats:", err));

		// Listen for real-time messages for this conversation
		socketRef.current.on("receive_message", (allMessages) => {
			const filtered = allMessages.filter(
				(msg) =>
					(msg.userId === adminId &&
						msg.targetUserId === targetUserId) ||
					(msg.userId === targetUserId &&
						msg.targetUserId === adminId)
			);
			setMessages(filtered);
		});

		// Clean up on unmount
		return () => {
			if (socketRef.current) socketRef.current.disconnect();
		};
	}, []);

	const handleTabChange = (tab) => {
		setCurrTab(tab);
	};

	const handleSend = (e) => {
		e.preventDefault();
		if (input.trim()) {
			const messageData = {
				author: adminUsername,
				message: input.trim(),
				userId: adminId,
				targetUserId: targetUserId,
			};
			socketRef.current.emit("send_message", messageData);
			setInput("");
		}
	};

	useEffect(() => {
		const chatWindow = document.querySelector(".chat-window");
		chatWindow.scrollTop = chatWindow.scrollHeight;
	}, [messages]);

	return (
		<div className="flex ">
			<div className="col-md-5flex flex-col chat-container">
				{/* Chat Messages Container */}
				<div className="p-2 bg-blue-700 text-white border-2 shadow-2xl shadow-blue-400 border-blue-700 rounded-top fw-bold fs-5 user-title">
					{targetUserName}
				</div>
				<div className="flex-1 p-3 border-2 shadow-2xl shadow-blue-400  border-blue-700 rounded  overflow-y-auto bg-blue-950 text-black chat-window">
					{messages.length > 0 ? (
						messages.map((msg) => (
							<div
								key={msg.id}
								className={`flex mb-2 ${
									msg.author === adminUsername
										? "justify-end"
										: "justify-start"
								}`}
							>
								<div
									className={` p-2 rounded max-w-[80%] break-words ${
										msg.author === adminUsername
											? "bg-blue-500 text-white rounded-bl-none"
											: "bg-gray-300 text-black rounded-br-none"
									}`}
								>
									<p className="text-sm">{msg.message}</p>
								</div>
							</div>
						))
					) : (
						<p className="text-center text-gray-500 mt-4">
							No messages found for this conversation.
						</p>
					)}
				</div>

				{/* Input Form */}
				<form
					onSubmit={handleSend}
					className="flex border-t border-blue-800 chat-footer-section"
				>
					<input
						type="text"
						placeholder="Type a message..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="flex-1 p-2 outline-none text-gray-300 bg-blue-950 msg-textbox"
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 send-btn"
					>
						Send
					</button>
				</form>
			</div>
			<div className="col-md-7">
				<div>
					<ul className="tab-link-container nav nav-pills">
						<li className="nav-item">
							<div
								className={`nav-link text-white ${
									currTab === "trades" ? "active" : ""
								}`}
								onClick={() => handleTabChange("trades")}
							>
								Trades
							</div>
						</li>
						<li className="nav-item">
							<div
								className={`nav-link text-white ${
									currTab === "portfolio" ? "active" : ""
								}`}
								onClick={() => handleTabChange("portfolio")}
							>
								Portfolio
							</div>
						</li>
					</ul>
					<div className="tab-content">
						{currTab === "trades" ? <Tradesuser /> : <Portfolio />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminChatBox;

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import "./UserChatBox.css";

// Hard-coded user and target admin details
// const userId = 'U1';
const userUsername = "User";
const targetAdminId = "A1";

const UserChatBox = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const socketRef = useRef(null);

	const userdata = useSelector((state) => state);
	const [userId, setUserId] = useState(userdata.userAuth.user.user_id);

	useEffect(() => {
		// Establish a single socket connection
		socketRef.current = io("https://crms-chat-backend.onrender.com");

		// Fetch all messages and filter for the conversation between the user and admin
		fetch("https://crms-chat-backend.onrender.com/api/chats")
			.then((res) => res.json())
			.then((data) => {
				const filtered = data.filter(
					(msg) =>
						(msg.userId === userId &&
							msg.targetUserId === targetAdminId) ||
						(msg.userId === targetAdminId &&
							msg.targetUserId === userId)
				);
				setMessages(filtered);
			})
			.catch((err) => console.error("Error fetching chats:", err));

		// Listen for real-time messages and filter for this conversation
		socketRef.current.on("receive_message", (allMessages) => {
			const filtered = allMessages.filter(
				(msg) =>
					(msg.userId === userId &&
						msg.targetUserId === targetAdminId) ||
					(msg.userId === targetAdminId &&
						msg.targetUserId === userId)
			);
			setMessages(filtered);
		});

		// Clean up the socket connection on unmount
		return () => {
			if (socketRef.current) socketRef.current.disconnect();
		};
	}, []);

	useEffect(() => {
		const chatWindow = document.querySelector(".chat-window");
		chatWindow.scrollTop = chatWindow.scrollHeight;
	}, [messages]);

	const handleSend = (e) => {
		e.preventDefault();
		if (input.trim()) {
			// Prepare the message with the user's details and the target admin ID
			const messageData = {
				author: userUsername,
				message: input.trim(),
				userId: userId,
				targetUserId: targetAdminId,
			};
			socketRef.current.emit("send_message", messageData);
			setInput("");
		}
	};

	const handleDelete = (messageId) => {
		console.log("User deleting message with ID:", messageId);
		socketRef.current.emit("delete_message", messageId);
	};

	return (
		<div
			className="w-100 flex flex-col justify-content-center align-items-center chat-container
        bg-[radial-gradient(circle,_#1a4db4_0%,_#253352_40%,_#1a202c_100%)]"
		>
			<div className="w-75 p-2 bg-blue-700 text-white border-2 shadow-2xl shadow-blue-400 border-blue-700 rounded-top fw-bold fs-5">
				Chat with Admin
			</div>
			<div className="chat-window w-75 bg-blue-950 text-black border-2 shadow-2xl shadow-blue-400 border-blue-700">
				{messages.length > 0 ? (
					messages.map((msg) => (
						<div
							key={msg.id}
							className={`flex mb-2 ${
								msg.author === "Admin"
									? "justify-start"
									: "justify-end"
							}`}
						>
							<div
								className={`p-2 rounded max-w-[80%] break-words ${
									msg.author === "Admin"
										? "bg-blue-500 text-white rounded-br-none"
										: "bg-gray-300 text-black rounded-bl-none"
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
				className="chat-footer-section w-75 border-t border-blue-800"
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
	);
};

export default UserChatBox;

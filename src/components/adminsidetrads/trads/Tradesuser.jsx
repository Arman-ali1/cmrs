import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Trade.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import { useSelector, useDispatch } from 'react-redux';

function Tradesuser() {
	//   const userdata = useSelector(state => state);
	//   // console.log("User Profile",useSelector(state => state));
	//   console.log("User Profile",userdata.userAuth.user.user_id);
	//   const [userId, setUserId] = useState(userdata.userAuth.user.user_id);

	const stockSymbol = "AAPL"; // Example stock symbol
	const apiToken = "66766c167cbb4fa7bdcc9ecfa9574abc"; // Replace with your API token
	// const mm=https://cloud.iexapis.com/stable/stock/AAPL/quote?token=66766c167cbb4fa7bdcc9ecfa9574abc
	const url = `https://cloud.iexapis.com/stable/stock/${stockSymbol}/quote?token=${apiToken}`;
	useEffect(() => {
		axios
			.get(
				"//cloud.iexapis.com/stable/stock/AAPL/quote?token=66766c167cbb4fa7bdcc9ecfa9574abc"
			)
			.then((res) => {
				setMoedas(res.data);
				console.log(res.data);
			})
			.catch((error) => console.log(error));
	}, []);

	const location = useLocation();
	const { userId } = location.state || {};
	const [trades, setTrades] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [newTrade, setNewTrade] = useState({
		user_id: userId,
		currency_name: "",
		entry_price: "",
		current_price: "",
		leverage: "",
		liquidation: "",
		investment_amount: "",
		review: "",
		trade_date: "",
	});
	const [message, setMessage] = useState(null);
	const [showAddTradeForm, setShowAddTradeForm] = useState(false);

	useEffect(() => {
		const fetchTrades = async () => {
			try {
				const response = await fetch(
					`https://csrm.onrender.com/api/v1/trades/${userId}`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				console.log("Full API Response:", data);
				setTrades(Array.isArray(data) ? data : data.trades || []);
			} catch (error) {
				console.error("Error fetching trades:", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchTrades();
	}, []);

	const handleInputChange = (e) => {
		setNewTrade({ ...newTrade, [e.target.name]: e.target.value });
	};

	const handleAddTrade = async () => {
		try {
			const response = await fetch(
				"https://csrm.onrender.com/api/v1/trades/add",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newTrade),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to add trade");
			}
			const addedTrade = await response.json();
			setTrades([...trades, addedTrade]);
			setMessage("Trade added successfully");
			// Reset the form
			setNewTrade({
				user_id: userId,
				currency_name: "",
				entry_price: "",
				current_price: "",
				leverage: "",
				liquidation: "",
				investment_amount: "",
				review: "",
				trade_date: "",
			});
			setShowAddTradeForm(false);
		} catch (error) {
			console.error("Error adding trade:", error);
			setMessage("Failed to add trade");
		}
	};

	const handleDeleteTrade = async (id) => {
		try {
			const response = await fetch(
				`https://csrm.onrender.com/api/v1/trades/delete/${id}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete trade");
			}
			setTrades(trades.filter((trade) => trade.id !== id));
			setMessage("Trade deleted successfully");
		} catch (error) {
			console.error("Error deleting trade:", error);
			setMessage("Failed to delete trade");
		}
	};

	// If the button should say "Chat", redirect to the user-chat page.
	// (You can pass parameters as needed, e.g. the trade id)
	const handleChat = (trade) => {
		window.location.href = `/user-chat`;
	};

	// For the "Help" button, perform a help action (here, just an alert).
	const handleHelp = (trade) => {
		window.location.href = `/user-chat`;
		// You can add additional logic for the help action here.
	};

	if (loading) {
		return <div className="text-center text-white">Loading...</div>;
	}

	if (error) {
		return <div className="text-center text-danger">Error: {error}</div>;
	}

	return (
		<div className="container     ">
			<h1 className="text-center text-white mb-4">
				Welcome to Trades List
			</h1>
			{message && <div className="alert alert-info">{message}</div>}

			{/* Button to toggle Add-Trade Form */}
			<button
				className="btn btn-success mb-3"
				onClick={() => setShowAddTradeForm(!showAddTradeForm)}
			>
				{showAddTradeForm ? "Hide Trade Form" : "Add Trade"}
			</button>

			{/* Add-Trade Form */}
			{showAddTradeForm && (
				<div className="card p-3 mb-3">
					<div className="form-group mb-2">
						<label>User ID</label>
						<input
							type="number"
							name="user_id"
							value={newTrade.user_id}
							placeholder="User ID"
							className="form-control"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label>Currency Name</label>
						<input
							type="text"
							name="currency_name"
							value={newTrade.currency_name}
							placeholder="Currency Name"
							className="form-control"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label>Entry Price</label>
						<input
							type="number"
							step="0.01"
							name="entry_price"
							value={newTrade.entry_price}
							placeholder="Entry Price"
							className="form-control"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label>Current Price</label>
						<input
							type="number"
							step="0.01"
							name="current_price"
							value={newTrade.current_price}
							placeholder="Current Price"
							className="form-control"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label>Leverage</label>
						<input
							type="number"
							step="0.01"
							name="leverage"
							value={newTrade.leverage}
							placeholder="Leverage"
							className="form-control"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label>Liquidation</label>
						<input
							type="number"
							step="0.01"
							name="liquidation"
							value={newTrade.liquidation}
							placeholder="Liquidation"
							className="form-control"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label>Investment Amount</label>
						<input
							type="number"
							step="0.01"
							name="investment_amount"
							value={newTrade.investment_amount}
							placeholder="Investment Amount"
							className="form-control"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label>Review</label>
						<textarea
							name="review"
							value={newTrade.review}
							placeholder="Review"
							className="form-control"
							onChange={handleInputChange}
						></textarea>
					</div>
					<div className="form-group mb-2">
						<label>Trade Date</label>
						<input
							type="datetime-local"
							name="trade_date"
							value={newTrade.trade_date}
							className="form-control"
							onChange={handleInputChange}
						/>
					</div>
					<button
						className="btn btn-primary"
						onClick={handleAddTrade}
					>
						Submit Trade
					</button>
				</div>
			)}

			{/* Table */}
			<div className="table-responsive ">
				<table className="table table-dark table-striped">
					<thead>
						<tr>
							<th>#</th>
							<th>Trade ID</th>
							<th>Currency</th>
							<th>Entry Price</th>
							<th>Current Price</th>
							<th>Leverage</th>
							<th>Investment Amount</th>
							<th>Trade Date</th>
							<th className="actions-col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{trades.length > 0 ? (
							trades.map((trade, index) => {
								const key = trade.id || index;
								return (
									<tr key={key}>
										<td>{index + 1}</td>
										<td>{trade.id}</td>
										<td>{trade.currency_name}</td>
										<td>{trade.entry_price}</td>
										<td>{trade.current_price}</td>
										<td>{trade.leverage}</td>
										<td>{trade.investment_amount}</td>
										<td>
											{new Date(
												trade.trade_date
											).toLocaleString()}
										</td>
										<td>
											<button
												className="btn btn-danger btn-sm me-2"
												onClick={() =>
													handleDeleteTrade(trade.id)
												}
											>
												Delete
											</button>
											{Number(trade.user_id) === 5 ? (
												<button
													className="btn btn-primary btn-sm"
													onClick={() =>
														handleHelp(trade)
													}
												>
													Help
												</button>
											) : (
												<button
													className="btn btn-primary btn-sm"
													onClick={() =>
														handleChat(trade)
													}
												>
													Chat
												</button>
											)}
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td
									colSpan="9"
									className="text-center text-warning"
								>
									No trades available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Tradesuser;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Portfolio.css";
import { useSelector } from "react-redux";

function Portfolioall() {
	const userdata = useSelector((state) => state);
	console.log("User Profile", userdata.userAuth.user.user_id);
	const [userId] = useState(userdata.userAuth.user.user_id);

	const [portfolios, setPortfolios] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);
	const [showAddPortfolioForm, setShowAddPortfolioForm] = useState(false);

	// Form state for new portfolio
	const [newPortfolio, setNewPortfolio] = useState({
		user_id: userId,
		currency_name: "",
		entry_price: "",
		current_price: "",
		leverage: "",
		liquidation: "",
		investment_amount: "",
		review: "",
		portfolio_date: "",
	});

	useEffect(() => {
		const fetchPortfolios = async () => {
			try {
				const response = await fetch(
					`https://csrm.onrender.com/api/v1/portfolio/all-portfolio`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				console.log("Full API Response:", data);
				// Ensure we store an array in portfolios
				setPortfolios(
					Array.isArray(data) ? data : data.portfolios || []
				);
			} catch (error) {
				console.error("Error fetching portfolios:", error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPortfolios();
	}, [userId]);

	const handleInputChange = (e) => {
		setNewPortfolio({ ...newPortfolio, [e.target.name]: e.target.value });
	};

	const handleAddPortfolio = async () => {
		try {
			// Convert the datetime-local string to an ISO date string
			// Only do this if portfolio_date is not empty, otherwise you'll get an error.
			const isoDate = newPortfolio.portfolio_date
				? new Date(newPortfolio.portfolio_date).toISOString()
				: "";

			const response = await fetch(
				"https://csrm.onrender.com/api/v1/portfolio/add",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						...newPortfolio,
						portfolio_date: isoDate,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to add portfolio");
			}

			// The API should return the newly created portfolio object
			const addedPortfolio = await response.json();

			// Add the new portfolio to the list
			setPortfolios((prev) => [...prev, addedPortfolio]);
			setMessage("Portfolio added successfully");

			// Reset the form
			setNewPortfolio({
				user_id: userId,
				currency_name: "",
				entry_price: "",
				current_price: "",
				leverage: "",
				liquidation: "",
				investment_amount: "",
				review: "",
				portfolio_date: "",
			});
			setShowAddPortfolioForm(false);
		} catch (error) {
			console.error("Error adding portfolio:", error);
			setMessage("Failed to add portfolio");
		}
	};

	const handleDeletePortfolio = async (id) => {
		try {
			const response = await fetch(
				`https://csrm.onrender.com/api/v1/portfolios/delete/${id}`,
				{
					method: "DELETE",
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete portfolio");
			}
			setPortfolios((prev) => prev.filter((p) => p.id !== id));
			setMessage("Portfolio deleted successfully");
		} catch (error) {
			console.error("Error deleting portfolio:", error);
			setMessage("Failed to delete portfolio");
		}
	};

	const handleChat = (portfolio) => {
		window.location.href = `/user-chat`;
	};

	const handleHelp = (portfolio) => {
		window.location.href = `/user-chat`;
	};

	if (loading) {
		return <div className="text-center text-white">Loading...</div>;
	}

	if (error) {
		return <div className="text-center text-danger">Error: {error}</div>;
	}

	return (
		<div className="container mt-5">
			<h1 className="text-center text-white mb-4">
				Welcome to Portfolios List
			</h1>
			{message && <div className="alert alert-info">{message}</div>}

			{/* Button to toggle Add-Portfolio Form */}
			<button
				className="btn btn-success mb-3"
				onClick={() => setShowAddPortfolioForm(!showAddPortfolioForm)}
			>
				{showAddPortfolioForm ? "Hide Portfolio Form" : "Add Portfolio"}
			</button>

			{/* Add-Portfolio Form */}
			{showAddPortfolioForm && (
				<div className="card p-3 mb-3">
					<div className="form-group mb-2">
						<label>User ID</label>
						<input
							type="number"
							name="user_id"
							value={newPortfolio.user_id}
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
							value={newPortfolio.currency_name}
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
							value={newPortfolio.entry_price}
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
							value={newPortfolio.current_price}
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
							value={newPortfolio.leverage}
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
							value={newPortfolio.liquidation}
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
							value={newPortfolio.investment_amount}
							placeholder="Investment Amount"
							className="form-control"
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group mb-2">
						<label>Review</label>
						<textarea
							name="review"
							value={newPortfolio.review}
							placeholder="Review"
							className="form-control"
							onChange={handleInputChange}
						></textarea>
					</div>
					<div className="form-group mb-2">
						<label>Portfolio Date</label>
						<input
							type="datetime-local"
							name="portfolio_date"
							value={newPortfolio.portfolio_date}
							className="form-control"
							onChange={handleInputChange}
						/>
					</div>
					<button
						className="btn btn-primary"
						onClick={handleAddPortfolio}
					>
						Submit Portfolio
					</button>
				</div>
			)}

			{/* Table */}
			<div className="table-responsive">
				<table className="table table-dark table-striped">
					<thead>
						<tr>
							<th>SN</th>
							<th>Portfolio ID</th>
							<th>Currency</th>
							<th>Entry Price</th>
							<th>Current Price</th>
							<th>Leverage</th>
							<th>Investment Amount</th>
							<th>Portfolio Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{portfolios.length > 0 ? (
							portfolios.map((portfolio, index) => {
								const key = portfolio.id || index;
								return (
									<tr key={key}>
										<td>{index + 1}</td>
										<td>{portfolio.id}</td>
										<td>{portfolio.currency_name}</td>
										<td>{portfolio.entry_price}</td>
										<td>{portfolio.current_price}</td>
										<td>{portfolio.leverage}</td>
										<td>{portfolio.investment_amount}</td>
										<td>
											{/* Only parse the date if it's present */}
											{portfolio.portfolio_date
												? new Date(
														portfolio.portfolio_date
												  ).toLocaleString()
												: "N/A"}
										</td>
										<td>
											<button
												className="btn btn-danger btn-sm me-2"
												onClick={() =>
													handleDeletePortfolio(
														portfolio.id
													)
												}
											>
												Delete
											</button>
											{Number(portfolio.user_id) === 5 ? (
												<button
													className="btn btn-primary btn-sm"
													onClick={() =>
														handleHelp(portfolio)
													}
												>
													Help
												</button>
											) : (
												<button
													className="btn btn-primary btn-sm"
													onClick={() =>
														handleChat(portfolio)
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
									No portfolios available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Portfolioall;

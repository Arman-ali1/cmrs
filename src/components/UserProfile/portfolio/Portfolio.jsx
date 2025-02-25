import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Portfolio.css";

function Portfolio() {
    const [portfolios, setportfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newportfolio, setNewportfolio] = useState({
        user_id: "",
        currency_name: "",
        entry_price: "",
        current_price: "",
        leverage: "",
        liquidation: "",
        investment_amount: "",
        review: "",
        portfolio_date: "",
    });
    const [message, setMessage] = useState(null);
    const [showAddportfolioForm, setShowAddportfolioForm] = useState(false);

    useEffect(() => {
        const fetchportfolios = async () => {
            try {
                const response = await fetch(
                    "https://csrm.onrender.com/api/v1/portfolio"
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Full API Response:", data);
                setportfolios(Array.isArray(data) ? data : data.portfolios || []);
            } catch (error) {
                console.error("Error fetching portfolios:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchportfolios();
    }, []);

    const handleInputChange = (e) => {
        setNewportfolio({ ...newportfolio, [e.target.name]: e.target.value });
    };

    const handleAddportfolio = async () => {
        try {
            const response = await fetch(
                "https://csrm.onrender.com/api/v1/portfolios/add",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newportfolio),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add portfolio");
            }
            const addedportfolio = await response.json();
            setportfolios([...portfolios, addedportfolio]);
            setMessage("portfolio added successfully");
            // Reset the form
            setNewportfolio({
                user_id: "",
                currency_name: "",
                entry_price: "",
                current_price: "",
                leverage: "",
                liquidation: "",
                investment_amount: "",
                review: "",
                portfolio_date: "",
            });
            setShowAddportfolioForm(false);
        } catch (error) {
            console.error("Error adding portfolio:", error);
            setMessage("Failed to add portfolio");
        }
    };

    const handleDeleteportfolio = async (id) => {
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
            setportfolios(portfolios.filter((portfolio) => portfolio.id !== id));
            setMessage("portfolio deleted successfully");
        } catch (error) {
            console.error("Error deleting portfolio:", error);
            setMessage("Failed to delete portfolio");
        }
    };

    // If the button should say "Chat", redirect to the user-chat page.
    // (You can pass parameters as needed, e.g. the portfolio id)
    const handleChat = (portfolio) => {
        window.location.href = `/user-chat`;
    };

    // For the "Help" button, perform a help action (here, just an alert).
    const handleHelp = (portfolio) => {
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
        <div className="container mt-5   ">
            <h1 className="text-center text-white mb-4">
                Welcome to portfolios List
            </h1>
            {message && <div className="alert alert-info">{message}</div>}

            {/* Button to toggle Add-portfolio Form */}
            <button
                className="btn btn-success mb-3"
                onClick={() => setShowAddportfolioForm(!showAddportfolioForm)}
            >
                {showAddportfolioForm ? "Hide portfolio Form" : "Add portfolio"}
            </button>

            {/* Add-portfolio Form */}
            {showAddportfolioForm && (
                <div className="card p-3 mb-3">
                    <div className="form-group mb-2">
                        <label>User ID</label>
                        <input
                            type="number"
                            name="user_id"
                            value={newportfolio.user_id}
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
                            value={newportfolio.currency_name}
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
                            value={newportfolio.entry_price}
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
                            value={newportfolio.current_price}
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
                            value={newportfolio.leverage}
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
                            value={newportfolio.liquidation}
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
                            value={newportfolio.investment_amount}
                            placeholder="Investment Amount"
                            className="form-control"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label>Review</label>
                        <textarea
                            name="review"
                            value={newportfolio.review}
                            placeholder="Review"
                            className="form-control"
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="form-group mb-2">
                        <label>portfolio Date</label>
                        <input
                            type="datetime-local"
                            name="portfolio_date"
                            value={newportfolio.portfolio_date}
                            className="form-control"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleAddportfolio}
                    >
                        Submit portfolio
                    </button>
                </div>
            )}

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>portfolio ID</th>
                            <th>Currency</th>
                            <th>Entry Price</th>
                            <th>Current Price</th>
                            <th>Leverage</th>
                            <th>Investment Amount</th>
                            <th>portfolio Date</th>
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
                                            {new Date(
                                                portfolio.portfolio_date
                                            ).toLocaleString()}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={() =>
                                                    handleDeleteportfolio(portfolio.id)
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

export default Portfolio;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../tradslist/tradelist.css";

function TradesList() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTrade, setNewTrade] = useState({
    user_id: "",
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

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/trade/getalltrades"
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
        "https://api.cryptomillionairerohitsharma.com/api/v1/trade/addtrade",
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
    } catch (error) {
      console.error("Error adding trade:", error);
      setMessage("Failed to add trade");
    }
  };

  const handleDeleteTrade = async (id) => {
    try {
      const response = await fetch(
        `https://api.cryptomillionairerohitsharma.com/api/v1/trade/deletetrade/${id}`,
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

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white mb-4">Welcome to Trades List</h1>
      {message && <div className="alert alert-info">{message}</div>}
      <button
        className="btn btn-success mb-3"
        onClick={() =>
          document.getElementById("addTradeForm").classList.toggle("d-none")
        }
      >
        Add Trade
      </button>
      <div id="addTradeForm" className="d-none">
        <div className="card p-3 mb-3">
          <input
            type="text"
            name="user_id"
            placeholder="User ID"
            className="form-control mb-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="currency_name"
            placeholder="Currency Name"
            className="form-control mb-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="entry_price"
            placeholder="Entry Price"
            className="form-control mb-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="current_price"
            placeholder="Current Price"
            className="form-control mb-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="leverage"
            placeholder="Leverage"
            className="form-control mb-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="liquidation"
            placeholder="Liquidation"
            className="form-control mb-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="investment_amount"
            placeholder="Investment Amount"
            className="form-control mb-2"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="review"
            placeholder="Review"
            className="form-control mb-2"
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="trade_date"
            className="form-control mb-2"
            onChange={handleInputChange}
          />
          <button className="btn btn-primary" onClick={handleAddTrade}>
            Submit Trade
          </button>
        </div>
      </div>
      <div className="table-responsive">
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trades.length > 0 ? (
              trades.map((trade, index) => (
                <tr key={trade.id || index}>
                  <td>{index + 1}</td>
                  <td>{trade.id}</td>
                  <td>{trade.currency_name}</td>
                  <td>{trade.entry_price}</td>
                  <td>{trade.current_price}</td>
                  <td>{trade.leverage}</td>
                  <td>{trade.investment_amount}</td>
                  <td>{new Date(trade.trade_date).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteTrade(trade.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-primary">Help</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-warning">
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

export default TradesList;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Components
import {
  Container,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert,
} from "@mui/material";

// Example list of countries
const countryList = [
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  { name: "Canada", code: "CA" },
  { name: "Australia", code: "AU" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "India", code: "IN" },
  { name: "China", code: "CN" },
  { name: "Japan", code: "JP" },
  { name: "Brazil", code: "BR" },
];

function SignUp() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    membership_type: "gold",
    username: "",
    country_code: "US",
    role_id: 2,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://csrm.onrender.com/api/v1/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Check if user was successfully created
      if (data.status === 201) {
        setMessage("User added successfully!");
        // Reset form fields
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          phone_number: "",
          membership_type: "gold",
          username: "",
          country_code: "US",
          role_id: 2,
        });
        // Navigate or redirect after success
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(`Error: ${data.error || "Failed to add user"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_number: "",
      membership_type: "gold",
      username: "",
      country_code: "US",
      role_id: 2,
    });
    navigate("/");
  };

  return (
    <Container
    className="h-auto   "
      maxWidth="sm"
      sx={{
        mt: 5,
        p: 3,
        borderRadius: 2,
        bgcolor: "rgba(0, 0, 0, 0.7)",
        color: "#fff",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>

      {message && (
        <Alert
          severity={message.includes("Error") ? "error" : "success"}
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="flex">
        
        <TextField
          required
          fullWidth
          margin="normal"
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          InputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ style: { color: "#fff" } }}
        />

        {/* Last Name */}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          InputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ style: { color: "#fff" } }}
        />
        </div>
        {/* Email */}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          InputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ style: { color: "#fff" } }}
        />

        {/* Password */}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          InputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ style: { color: "#fff" } }}
        />

        {/* Phone Number */}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          InputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ style: { color: "#fff" } }}
        />

        {/* Username */}
        <TextField
          required
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          InputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ style: { color: "#fff" } }}
        />

        {/* Membership Type */}
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: "#fff" }}>Membership Type</InputLabel>
          <Select
            name="membership_type"
            value={formData.membership_type}
            onChange={handleChange}
            label="Membership Type"
            sx={{ color: "#fff" }}
          >
            <MenuItem value="gold">Gold</MenuItem>
            <MenuItem value="silver">Silver</MenuItem>
            <MenuItem value="bronze">Bronze</MenuItem>
          </Select>
        </FormControl>

        {/* Country Code */}
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: "#fff" }}>Country Code</InputLabel>
          <Select
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            label="Country Code"
            sx={{ color: "#fff" }}
          >
            {countryList.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name} ({country.code})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={3} display="flex" justifyContent="space-between" >
          <Button
            variant="contained"
            color="inherit"
            onClick={handleCancel}
            sx={{
              bgcolor: "gray",
              color: "#fff",
              width: "48%",
              "&:hover": {
                bgcolor: "#555",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{
              width: "48%",
              "&:hover": {
                bgcolor: "#1565c0",
              },
            }}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;

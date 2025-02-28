import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { redirectUserBasedOnRole } from "../../utils/userAuthUtils";
import { useSelector } from "react-redux";

function Login({ login }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "2", // Default role
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roleId = await login(formData);
      redirectUserBasedOnRole(true, roleId, navigate);
    } catch (err) {
      // The login failure error is handled in the Redux state,
      // so we simply catch the promise rejection here if needed.
      console.error("Login failed:", err);
    }
  };

  // Get error message from Redux state (assuming your reducer stores the error as userAuth.error)
  const { error } = useSelector((state) => state.userAuth);
  console.log("Login Errorb", error);
  

  return (
    <Container
      maxWidth="sm"
      className="relative rounded-lg p-6 border-4 border-blue-700 bg-black bg-opacity-60 text-white shadow-lg"
    >
      <Box className="relative mt-8 flex flex-col items-center">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} className="mt-3 space-y-6">
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'blue' },
                '&:hover fieldset': { borderColor: 'blue' },
                '&.Mui-focused fieldset': { borderColor: 'blue' },
              },
            }}
          />

          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{
              shrink: true,
              style: { color: "white" },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'blue' },
                '&:hover fieldset': { borderColor: 'blue' },
                '&.Mui-focused fieldset': { borderColor: 'blue' },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-3 mb-2 bg-blue-600 hover:bg-blue-700"
          >
            Login
          </Button>

          <Box className="mt-4 flex justify-center">
            <p className="text-white pr-4">Don't have an account?</p>
            <Button
              href="/sign-up"
              variant="contained"
              className="bg-blue-600 hover:font-bold hover:text-red-900"
            >
              Sign Up
            </Button>
          </Box>

          {/* Display the login error message if it exists */}
          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Login;

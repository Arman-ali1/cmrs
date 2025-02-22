import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import '@emotion/styled';
import { useNavigate } from "react-router-dom"

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/");
    alert('Form submitted successfully');
  };

  return (
    <Container
      maxWidth="sm"
      className="relative rounded-lg p-6 border-4 border-blue-700 bg-black bg-opacity-60 text-white shadow-lg"
    >
      <Box
        className="absolute inset-0  bg-cover bg-center opacity-20"
      />
      <Box className="relative mt-8 flex flex-col items-center">
        <Typography component="h1" variant="h5" className=''>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} className="mt-3 space-y-6">
          <TextField
            required
            fullWidth
            id="username"
            label={<span className="text-white  hover:text-blue-800">Username</span>}
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            required
            fullWidth
            id="email"
            label={<span className="text-white hover:text-blue-800">Email Address</span>}
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            required
            fullWidth
            id="mobile"
            label={<span className="text-white hover:text-blue-800">Mobile Number</span>}
            name="mobile"
            autoComplete="tel"
            value={formData.mobile}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            required
            fullWidth
            name="password"
            label={<span className="text-white hover:text-blue-800">Password</span>}
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{ style: { color: 'white' } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-3 mb-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Box className="mt-4 flex justify-center">
            <p className="text-white pr-4">Already have an account?</p>
            <Button
              href="/"
              variant="contained"
              className="bg-blue-600  hover:font-bold  hover:text-red-900"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;

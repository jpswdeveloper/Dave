import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert, useMediaQuery, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" width="100vw">
      <Box
        sx={{
          p: isMobile ? 2 : 4,
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" mb={2}>Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
        <Typography mt={2}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login; 
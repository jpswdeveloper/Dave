import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SiteInfoList from './pages/SiteInfoList';
import SiteInfoForm from './pages/SiteInfoForm';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@mui/material';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Site Info Manager</Typography>
          {isAuthenticated && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            isAuthenticated ? <SiteInfoList /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/siteinfo/new"
          element={
            isAuthenticated ? <SiteInfoForm /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/siteinfo/:id/edit"
          element={
            isAuthenticated ? <SiteInfoForm /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

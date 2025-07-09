import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, CircularProgress, Alert, Box, Stack, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function SiteInfoList() {
  const [siteInfos, setSiteInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const isMobile = useMediaQuery('(max-width:600px)');

  const fetchSiteInfos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${BASE_URL}/api/siteinfo`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSiteInfos(res.data);
    } catch (err) {
      setError('Failed to load site info');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSiteInfos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await axios.delete(`${BASE_URL}/api/siteinfo/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSiteInfos(siteInfos.filter(info => info._id !== id));
    } catch (err) {
      setError('Failed to delete');
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Box px={isMobile ? 0 : 2} mt={10} p={2}>
      <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems={isMobile ? 'stretch' : 'center'} mb={2} spacing={2}>
        <Typography variant="h5">Site Information</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/siteinfo/new')}>
          Add New
        </Button>
      </Stack>
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell>Site ID</TableCell>
                <TableCell>Azimute</TableCell>
                <TableCell>Electrical Tilt</TableCell>
                <TableCell>Mechanical Tilt</TableCell>
                <TableCell>Antenna Height</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {siteInfos.map(info => (
                <TableRow key={info._id}>
                  <TableCell>{info.siteId}</TableCell>
                  <TableCell>{info.azimute}</TableCell>
                  <TableCell>{info.electricalTilt}</TableCell>
                  <TableCell>{info.mechanicalTilt}</TableCell>
                  <TableCell>{info.antennaHeight}</TableCell>
                  <TableCell>
                    <Button size="small" startIcon={<EditIcon />} onClick={() => navigate(`/siteinfo/${info._id}/edit`)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(info._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default SiteInfoList; 
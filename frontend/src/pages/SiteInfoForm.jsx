import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert, Paper, Grid, useMediaQuery } from '@mui/material';
import axios from 'axios';

function SiteInfoForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const [form, setForm] = useState({
    siteId: '',
    azimute: '',
    electricalTilt: '',
    mechanicalTilt: '',
    antennaHeight: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      axios.get(`${BASE_URL}/api/siteinfo/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(res => setForm(res.data))
        .catch(() => setError('Failed to load site info'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = e => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = field => {
    return form[field] === '' && touched[field];
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setTouched({
      siteId: true,
      azimute: true,
      electricalTilt: true,
      mechanicalTilt: true,
      antennaHeight: true,
    });
    // Check for empty fields
    if (Object.values(form).some(val => val === '')) return;
    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`${BASE_URL}/api/siteinfo/${id}`,
          form,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      } else {
        await axios.post(`${BASE_URL}/api/siteinfo`,
          form,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
      navigate('/');
    } catch (err) {
      setError('Failed to save');
    }
    setLoading(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Grid item xs={12} sm={10} md={7} lg={5}>
        <Box
          component={Paper}
          p={isMobile ? 2 : 3}
          sx={{
            width: '100%',
            maxWidth: 500,
            mx: 'auto',
            boxShadow: 2,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h6" mb={2}>{isEdit ? 'Edit' : 'Add'} Site Info</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Site ID"
              name="siteId"
              value={form.siteId}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              type="number"
              error={validate('siteId')}
              helperText={validate('siteId') ? 'Site ID is required' : ''}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Azimute"
              name="azimute"
              value={form.azimute}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              type="number"
              error={validate('azimute')}
              helperText={validate('azimute') ? 'Azimute is required' : ''}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Electrical Tilt"
              name="electricalTilt"
              value={form.electricalTilt}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              type="number"
              error={validate('electricalTilt')}
              helperText={validate('electricalTilt') ? 'Electrical Tilt is required' : ''}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Mechanical Tilt"
              name="mechanicalTilt"
              value={form.mechanicalTilt}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              type="number"
              error={validate('mechanicalTilt')}
              helperText={validate('mechanicalTilt') ? 'Mechanical Tilt is required' : ''}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Antenna Height"
              name="antennaHeight"
              value={form.antennaHeight}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              required
              type="number"
              error={validate('antennaHeight')}
              helperText={validate('antennaHeight') ? 'Antenna Height is required' : ''}
              sx={{ mt: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} disabled={loading}>
              {isEdit ? 'Update' : 'Create'}
            </Button>
            <Button variant="text" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/')}>Cancel</Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SiteInfoForm; 
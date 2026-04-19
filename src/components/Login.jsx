import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../AuthContext';
import { authenticate } from '../api';

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('orbit2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authenticate(username, password);
      login(res.data.accessToken); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', p: 3, bgcolor: '#000000' }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 4, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Box sx={{ bgcolor: 'rgba(34, 211, 238, 0.1)', p: 1.5, borderRadius: 2, mb: 2 }}>
            <LockOutlinedIcon sx={{ fontSize: 28, color: '#22d3ee' }} />
          </Box>
          <Typography variant="h4" color="white" gutterBottom>
            Orbit IMS
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Experiment 2.3: Advanced JPA & Auth
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 1 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField 
              label="Username" 
              variant="outlined" 
              fullWidth 
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={loading}
              size="small"
            />
            <TextField 
              label="Password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              size="small"
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              disabled={loading}
              sx={{ mt: 2, py: 1.2 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Secure Login'}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
}

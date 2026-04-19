import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Grid, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import { getFlywayMigrations } from '../api';

export default function Dashboard() {
  const [migrations, setMigrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMigrations = async () => {
      try {
        const res = await getFlywayMigrations();
        setMigrations(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMigrations();
  }, []);

  return (
    <Box>
      <Box mb={6}>
        <Typography variant="h2" color="white" gutterBottom>
          Platform Overview
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Database Versioning (Flyway/Liquibase) & Metrics
        </Typography>
      </Box>

      <Grid container spacing={4} mb={6}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%', borderColor: 'rgba(34, 211, 238, 0.3)' }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" color="text.secondary">Schema Management</Typography>
              <BuildIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            </Box>
            <Typography variant="h4" color="white" mb={1}>Flyway Active</Typography>
            <Typography variant="body2" color="text.secondary">
              Database state is controlled by SQL migration scripts, ensuring reliable, reproducible deployments across environments.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6" color="text.secondary">Current Schema Version</Typography>
              <StorageIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
            </Box>
            <Typography variant="h4" color="white" mb={1}>v2.0</Typography>
            <Typography variant="body2" color="text.secondary">
              Latest Script: <code>V2.0__alter_products_stock_trigger.sql</code> applied successfully.
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" color="white" gutterBottom>
        <code>flyway_schema_history</code> Log
      </Typography>
      <Card sx={{ mt: 3 }}>
        {loading ? (
          <Box p={5} textAlign="center"><CircularProgress /></Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Version</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Script</TableCell>
                  <TableCell>Installed On</TableCell>
                  <TableCell>State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {migrations.map((m) => (
                  <TableRow key={m.version}>
                    <TableCell sx={{ color: 'primary.light', fontWeight: 'bold' }}>{m.version}</TableCell>
                    <TableCell>{m.description}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{m.script}</TableCell>
                    <TableCell>{m.installedOn}</TableCell>
                    <TableCell>
                      <Chip label={m.state} size="small" color="success" variant="outlined" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  );
}

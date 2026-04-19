import React, { useState } from 'react';
import { Box, Card, Typography, Grid, Button, CircularProgress, Chip, Paper } from '@mui/material';
import { fetchProductsLazy, fetchProductsEager } from '../api';
import DataObjectIcon from '@mui/icons-material/DataObject';

export default function Inventory() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchType, setFetchType] = useState(''); // 'LAZY' or 'EAGER'

  const handleFetch = async (type) => {
    setLoading(true);
    setFetchType(type);
    try {
      if (type === 'LAZY') {
        const res = await fetchProductsLazy();
        setProducts(res.data);
      } else {
        const res = await fetchProductsEager();
        setProducts(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={6}>
        <Typography variant="h2" color="white" gutterBottom>
          Inventory Entity Mappings
        </Typography>
        <Typography variant="h6" color="text.secondary">
          JPA @OneToMany & @ManyToMany Fetch Strategies
        </Typography>
      </Box>

      <Grid container spacing={4} mb={6}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" color="primary.light" gutterBottom>
              Simulate N+1 / Lazy Fetch
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Product entity is loaded, but associations (Supplier, Category) remain uninitialized proxies. Accessing them later causes extra DB queries.
            </Typography>
            <Button variant="outlined" color="primary" onClick={() => handleFetch('LAZY')} disabled={loading}>
              Execute Lazy Fetch
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%' }}>
            <Typography variant="h5" color="secondary.light" gutterBottom>
              Simulate JOIN FETCH / Eager
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Uses JPQL <code>JOIN FETCH</code> to retrieve Product, Supplier, and Category entities in a single optimized query.
            </Typography>
            <Button variant="outlined" color="secondary" onClick={() => handleFetch('EAGER')} disabled={loading}>
              Execute Eager Fetch
            </Button>
          </Card>
        </Grid>
      </Grid>

      {loading && <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>}

      {products && !loading && (
        <Card sx={{ p: 4, borderTop: fetchType === 'LAZY' ? '4px solid #22d3ee' : '4px solid #f43f5e' }}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <DataObjectIcon fontSize="large" color={fetchType === 'LAZY' ? 'primary' : 'secondary'} />
            <Typography variant="h5" color="white">
              Data Graph ({fetchType} Load)
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {products.map(p => (
              <Grid item xs={12} lg={4} key={p.id}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" color="white">{p.name}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>Product ID: {p.id}</Typography>
                  
                  <Box mb={2}>
                    <Typography variant="caption" color="text.secondary" display="block">@ManyToOne (Supplier)</Typography>
                    {typeof p.supplier === 'string' ? (
                      <Chip label={p.supplier} size="small" color="warning" variant="outlined" />
                    ) : (
                      <Chip label={p.supplier.name} size="small" color="success" />
                    )}
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">@ManyToMany (Categories)</Typography>
                    {typeof p.categories === 'string' ? (
                      <Chip label={p.categories} size="small" color="warning" variant="outlined" />
                    ) : (
                      p.categories.map(c => <Chip key={c.id} label={c.name} size="small" color="success" sx={{ mr: 1 }} />)
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}
    </Box>
  );
}

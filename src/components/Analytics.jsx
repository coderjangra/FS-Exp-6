import React, { useState } from 'react';
import { Box, Card, Typography, Grid, Button, CircularProgress, Paper, Divider } from '@mui/material';
import { executeQuery } from '../api';
import TerminalIcon from '@mui/icons-material/Terminal';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const runQuery = async (type) => {
    setLoading(true);
    try {
      const res = await executeQuery(type);
      setData(res.data);
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
          Query Analytics
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Optimized Database Queries using JPQL & Criteria API
        </Typography>
      </Box>

      <Grid container spacing={4} mb={6}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%', borderColor: 'rgba(34, 211, 238, 0.3)' }}>
            <Typography variant="h5" color="primary.light" gutterBottom>
              JPQL High-Value Products
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.5)', mb: 3 }}>
              <Typography variant="caption" color="primary" fontFamily="monospace">
                SELECT p FROM Product p<br/>
                WHERE p.price &gt; 100 AND p.stock &lt; 50<br/>
                ORDER BY p.price DESC
              </Typography>
            </Paper>
            <Button variant="contained" color="primary" onClick={() => runQuery('JPQL_HIGH_VALUE')} disabled={loading}>
              Execute JPQL
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
            <Typography variant="h5" color="info.light" gutterBottom>
              Criteria API Aggregation
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.5)', mb: 3 }}>
              <Typography variant="caption" color="info.main" fontFamily="monospace">
                CriteriaQuery&lt;Tuple&gt; cq = cb.createTupleQuery();<br/>
                Root&lt;Supplier&gt; root = cq.from(Supplier.class);<br/>
                cq.multiselect(root.get("name"), cb.count(root.join("products")));<br/>
                cq.groupBy(root.get("name"));
              </Typography>
            </Paper>
            <Button variant="contained" color="info" onClick={() => runQuery('CRITERIA_JOIN')} disabled={loading}>
              Execute Criteria
            </Button>
          </Card>
        </Grid>
      </Grid>

      {loading && <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>}

      {data && !loading && (
        <Card sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TerminalIcon color="success" />
            <Typography variant="h6" color="white">Execution Results</Typography>
          </Box>
          <Typography variant="body2" color="success.main" mb={3}>
            Query Executed in {data.executionTime}
          </Typography>
          <Paper sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.5)', color: 'text.secondary', fontFamily: 'monospace', overflowX: 'auto' }}>
            <pre style={{ margin: 0 }}>
              {JSON.stringify(data.results, null, 2)}
            </pre>
          </Paper>
        </Card>
      )}
    </Box>
  );
}

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, IconButton, 
  Avatar, Button, Tooltip, Chip 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../AuthContext';

const drawerWidth = 260;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, sessionState, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Inventory (JPA)', icon: <InventoryIcon />, path: '/inventory' },
    { text: 'Analytics (JPQL)', icon: <QueryStatsIcon />, path: '/analytics' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', color: 'black', fontWeight: 900, width: 44, height: 44 }}>
          {user?.username?.charAt(0).toUpperCase() || 'O'}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
            Orbit<span style={{ color: '#22d3ee' }}>IMS</span>
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight="bold">
            Exp 2.3 Admin
          </Typography>
        </Box>
      </Box>
      
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => { navigate(item.path); setMobileOpen(false); }}
                sx={{
                  borderRadius: '6px',
                  py: 1.2,
                  bgcolor: isActive ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }} 
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      
      <Box p={3}>
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<LogoutIcon />} 
          onClick={handleLogout}
          sx={{ py: 1 }}
        >
          Disconnect
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 }, py: 1 }}>
          <Box display="flex" alignItems="center">
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="700" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {menuItems.find(i => i.path === location.pathname)?.text || 'Platform'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Tooltip title="Session State (Short-lived AT + RT Rotation)">
              <Chip 
                label={`Session: ${sessionState}`} 
                color={sessionState.includes('Expired') ? 'warning' : 'success'} 
                variant="outlined" 
                size="small" 
                sx={{ fontWeight: 'bold' }} 
              />
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, sm: 6 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

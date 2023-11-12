import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Divider from '@mui/material/Divider';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapIcon from '@mui/icons-material/Map';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor:'#003', boxShadow: 'none',padding: '20px', opacity: '0.8', 
  color: 'black', 
  fontSize: '40px', 
  fontFamily: 'poppins',
  height : '200px',
  
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(15)} + 1px)`,
  
  },
  backgroundColor: '#003', boxShadow: 'none',padding: '20px', opacity: '0.8', 
  color: 'white', 
  fontFamily: 'Arial, sans-serif', 
  
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 7),
    ...theme.mixins.toolbar,
  }));





const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: open ? 'rgb(0, 0, 0, 0)' :  'rgb(0, 0, 0, 0)', boxShadow: 'none',paddingTop: '25px',paddingLeft: '-35px', paddingBottom: '25px',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
      '& .MuiBackdrop-root': {
        
        display: 'block',
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
      '& .MuiBackdrop-root': {
        display: 'none',
      },
    }),
  }),
);

const iconMap = {
    email: <MailIcon sx={{ color: 'white', fontSize: '50px' }} />,
    news: <InboxIcon sx={{ color: 'white', fontSize: '50px' }} />,
    checkbox: <ChecklistIcon sx={{ color: 'white', fontSize: '50px' }} />,
    shipping: <LocalShippingIcon sx={{ color: 'white', fontSize: '50px' }} />,
    map: <MapIcon sx={{ color: 'white', fontSize: '50px' }} />,
    work: <MapsHomeWorkIcon sx={{ color: 'white', fontSize: '50px' }} />,

  };

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', width: '90%' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ display: 'flex', width: '4%', marginRight: '95%' }}>
        <Toolbar>
          <IconButton
            color="white"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{ color: 'white' , fontSize: '50px' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} onClose={handleDrawerClose} sx={{ overflowY: 'hidden' }} >
      <DrawerHeader>
  <IconButton
    color="white"
    aria-label="open drawer"
    onClick={handleDrawerOpen}
    edge="start"
    sx={{
      marginRight: 5,
      ...(open && { display: 'none' }),
    }}
  >
    <MenuIcon />
  </IconButton>
 

  <IconButton sx={{ color: 'white' , fontSize: '60px' }} onClick={handleDrawerClose}>
    <CloseIcon sx={{ opacity: open ? 1 : 0, color: 'white' , fontSize: '60px' }}/>
  </IconButton>
 
</DrawerHeader>
        <Divider />
        <List>
          {['email', 'news', 'checkbox', 'shipping', 'map', 'work'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 98,
                  minWidth: 20,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  fontSize: open ? '50px' : '20px',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 20,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: open ? '2rem' : '1.5rem',
                    backgroundColor: open ? 'darkblue' : 'transparent',
                  }}
                >
                  {iconMap[text]}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, fontSize: open ? '50px' : '20px' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
       
      </Drawer>
    </Box>
  );
}
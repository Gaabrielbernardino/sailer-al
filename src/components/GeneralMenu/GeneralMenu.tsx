import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, Typography } from '@mui/material';
import { useDrawer } from '../../contexts/DrawerContext/DrawerContext';
import {
  DrawerFooterStyled,
  DrawerHeaderStyled,
  DrawerStyled,
} from './GeneralMenu.styles';

const options = [
  { name: 'Chats', path: '/chats', icon: <ChatIcon color="primary" /> },
];

const GeneralMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { open, setOpenDrawer } = useDrawer();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DrawerStyled variant="permanent" open={open}>
        <DrawerHeaderStyled>
          {open ? (
            <IconButton onClick={setOpenDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton onClick={setOpenDrawer}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </DrawerHeaderStyled>
        <Divider />
        <List>
          {options.map((option) => (
            <ListItem
              key={option.name}
              disablePadding
              sx={{ display: 'block', bgcolor: '#f2f2f2' }}
            >
              <ListItemButton
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open
                    ? { justifyContent: 'initial' }
                    : { justifyContent: 'center' },
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    open ? { mr: 3 } : { mr: 'auto' },
                  ]}
                >
                  {option.icon}
                </ListItemIcon>
                <ListItemText
                  primary={option.name}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <DrawerFooterStyled>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ mr: 2 }} />
            <Box mt={2}>
              <Typography variant="body2" lineHeight={0.5}>
                Eu
              </Typography>
              <Typography variant="caption">user0</Typography>
            </Box>
          </Box>
        </DrawerFooterStyled>
      </DrawerStyled>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default GeneralMenu;

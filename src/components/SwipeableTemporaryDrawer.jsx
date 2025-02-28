import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
// import PlaceIcon from '@mui/icons-material/PlaceIcon';
import { Typography, Paper, Stack } from "@mui/material";
import Drawer from '@mui/material/Drawer';

export default function SwipeableTemporaryDrawer({ open, setOpen, selectedProvince }) {
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  const list = (    
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >

      <Stack spacing={2} sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center">
          {selectedProvince || "Nama Provinsi"}
        </Typography>

        <Stack spacing={1}>
          <Typography variant="body2"><b>Ibu Kota:</b> {selectedProvince?.capital || "-"}</Typography>
          <Typography variant="body2"><b>Luas:</b> {selectedProvince?.area || "-"} km²</Typography>
          <Typography variant="body2"><b>Penduduk:</b> {selectedProvince?.population || "-"} jiwa</Typography>
        </Stack>

      </Stack>


      <Divider />

      <List>
        {['Budaya Khas', 'Kuliner Khas', 'Wisata Populer', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      disableBackdropTransition={!iOS} disableDiscovery={iOS}
    >
    {list}
    </Drawer>
  );
}

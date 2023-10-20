import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button, CssBaseline } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
import { useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from '@mui/material/IconButton';
import MenuIcon from "@mui/icons-material/Menu";

const DrawerComp = () => {

  const { access_token } = getToken();
  const { id } = useSelector(state => state.user)
  const { is_patient, is_doctor } = useSelector(state => state.user)

  let booking_url = `/booking/${id}`
  let doctor_review=`/doctorreview/${id}`


  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <>
      <CssBaseline />
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}   >
        <List sx={{ bgcolor: '#9c27b0' }}>
          <ListItemButton>
            <ListItemText>
              <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '', } }} sx={{ color: 'white', textTransform: 'none',}}>Home</Button>
            </ListItemText>
          </ListItemButton>

          <ListItemButton>
            <ListItemText>
              {access_token ? is_patient ? <Button component={NavLink} to='/dashboard' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '', } }} sx={{ color: 'White', textTransform: 'none' }}>Dashboard</Button> : null : <Button component={NavLink} to='/login' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Registration</Button>}
            </ListItemText>
          </ListItemButton>

          <ListItemButton>
            <ListItemText>
              {access_token ? <Button component={NavLink} to={booking_url} style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Booking</Button> : ''}
            </ListItemText>
          </ListItemButton>

          <ListItemButton>
            <ListItemText>
              {access_token ? is_doctor ? <Button component={NavLink} to='/doctordata' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Add Data</Button> : '' : ''}
            </ListItemText>
          </ListItemButton>

          <ListItemButton>
            <ListItemText>
              {access_token ? is_doctor ? <Button component={NavLink} to={doctor_review} style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Review</Button> : '' : ''}
            </ListItemText>
          </ListItemButton>

          <ListItemButton>
            <ListItemText>
              {access_token ? <Button component={NavLink} to='/profile' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Profile</Button> : ''}
            </ListItemText>
          </ListItemButton>

        </List>
      </Drawer>

      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default DrawerComp
